# =====================================================
# 🚀 AI Privacy Compliance Checker Backend (Updated)
# Includes: CORS + PDF/TXT Upload Endpoint + RAG Support
# =====================================================

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os, re, json, tempfile, shutil
from pathlib import Path
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from pdfminer.high_level import extract_text
from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer
import chromadb
import google.generativeai as genai
import torch
#import fitz
import chardet
from dotenv import load_dotenv

load_dotenv()

# --------------- CONFIG ---------------
MODEL_PATH = r"D:\VScodefiles\NLPPRO\ai-privacy-compliance-checker\backend\models\BART_LARGE_MNLI"
RAG_DB = r"D:\VScodefiles\NLPPRO\ai-privacy-compliance-checker\backend\data\chroma_rag"
RAG_PDF_DIR = r"D:\VScodefiles\NLPPRO\ai-privacy-compliance-checker\backend\data\rag_pdfs"
os.makedirs(RAG_PDF_DIR, exist_ok=True)
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# --------------- APP INIT ---------------
app = FastAPI(title="AI Privacy Compliance Checker")

# Allow all CORS for dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------- MODELS ---------------
print("🔹 Loading BART-MNLI model...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_PATH)
zero_shot = pipeline("zero-shot-classification", model=model, tokenizer=tokenizer, device=0 if DEVICE=="cuda" else -1)

print("🔹 Loading RAG embedding model...")
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")

print("🔹 Initializing Chroma client...")
chroma_client = chromadb.PersistentClient(path=RAG_DB)
if "privacy_rules" not in [c.name for c in chroma_client.list_collections()]:
    chroma_client.create_collection("privacy_rules")
collection = chroma_client.get_collection("privacy_rules")

# --------------- GEMINI ---------------
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_KEY:
    genai.configure(api_key=GEMINI_KEY)
    gemini_model = genai.GenerativeModel("gemini-2.5-flash")
else:
    gemini_model = None
    print("⚠️ No GEMINI_API_KEY set — recommendations will be skipped.")

# --------------- HELPERS ---------------
def extract_text_from_upload(upload_path: Path) -> str:
    suf = upload_path.suffix.lower()
    try:
        if suf == ".pdf":
            # ✅ Try PyMuPDF first (much more reliable)
            try:
                doc = fitz.open(str(upload_path))
                text = ""
                for page in doc:
                    text += page.get_text("text")
                doc.close()
                if text.strip():
                    return text
            except Exception as e:
                print(f"⚠️ PyMuPDF failed, fallback to pdfminer: {e}")
                return extract_text(str(upload_path))

        elif suf in [".html", ".htm"]:
            soup = BeautifulSoup(upload_path.read_text(errors="ignore"), "html.parser")
            for s in soup(["script", "style", "noscript"]):
                s.extract()
            return soup.get_text(separator=" ")

        elif suf in [".txt", ".md"]:
            # Detect encoding to avoid gibberish
            raw = upload_path.read_bytes()
            enc = chardet.detect(raw)["encoding"] or "utf-8"
            return raw.decode(enc, errors="ignore")

        else:
            return ""
    except Exception as e:
        print(f"⚠️ Error parsing {upload_path.name}: {e}")
        return ""

def split_into_clauses(text: str):
    paras = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    clauses = []
    for p in paras:
        sents = re.split(r"(?<=[.!?])\s+", p)
        for s in sents:
            if len(s.strip()) > 25:
                clauses.append(s.strip())
    return clauses

# --------------- ROUTES ---------------
@app.get("/health")
def health():
    return {"status": "running", "device": DEVICE, "model": "facebook/bart-large-mnli"}

# ----- 📄 Upload & Extract Endpoint -----
@app.post("/upload_clauses")
async def upload_docs(files: List[UploadFile] = File(...)):
    """Uploads PDF/TXT files, extracts text, splits into clauses."""
    tmpdir = tempfile.mkdtemp()
    all_clauses = []
    try:
        for file in files:
            path = Path(tmpdir) / file.filename
            with open(path, "wb") as f:
                shutil.copyfileobj(file.file, f)
            text = extract_text_from_upload(path)
            clauses = split_into_clauses(text)
            for i, c in enumerate(clauses):
                all_clauses.append({"source": file.filename, "id": i, "text": c})
        return {"n_files": len(files), "total_clauses": len(all_clauses), "clauses": all_clauses}
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)

# ----- ⚖️ Analyze Clauses -----
class AnalyzeRequest(BaseModel):
    clauses: List[str]
    candidate_labels: Optional[List[str]] = ["Compliant", "Non-Compliant", "Ambiguous"]

@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    texts = req.clauses
    result = zero_shot(texts, candidate_labels=req.candidate_labels)
    out = []
    for i, r in enumerate(result):
        label = r["labels"][0]
        score = r["scores"][0]
        # Retrieve context from RAG
        emb = embedding_model.encode(texts[i])
        hits = collection.query(query_embeddings=[emb.tolist()], n_results=3)
        contexts = []
        if hits and hits["documents"]:
            for d, md, sc in zip(hits["documents"][0], hits["metadatas"][0], hits["distances"][0]):
                contexts.append({"text": d, "metadata": md, "score": sc})
        out.append({"clause": texts[i], "label": label, "score": score, "contexts": contexts})
    return {"results": out}

# ----- 💡 Generate Recommendations -----
class RecItem(BaseModel):
    clause: str
    article: Optional[str] = None
    issue: Optional[str] = None

class RecRequest(BaseModel):
    non_compliant_items: List[RecItem]
    top_k_context: int = 5

@app.post("/recommendations")
def generate_recommendations(req: RecRequest):
    if not gemini_model:
        return {"error": "Gemini API not configured."}
    combined = "\n\n".join([f"- {n.clause}" for n in req.non_compliant_items])
    prompt = f"""
    You are an expert in data privacy compliance (GDPR, CCPA, HIPAA, etc.).
    Analyze these non-compliant clauses and suggest clear recommendations
    for compliance improvements, referencing relevant regulations.
    Clauses:
    {combined}
    """
    resp = gemini_model.generate_content(prompt)
    return {"generated": resp.text, "prompt": prompt}

# --------------- RUN CMD (optional) ---------------
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
