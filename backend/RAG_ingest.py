# ===============================================
# 🧠 Build RAG index from PDF privacy rule sources
# ===============================================
import os, re, json
from pathlib import Path
from pdfminer.high_level import extract_text
from sentence_transformers import SentenceTransformer
import chromadb

DATA_DIR = Path(r"D:\VScodefiles\NLPPRO\ai-privacy-compliance-checker\backend\data\rag_pdfs")
DB_DIR = Path(r"D:\VScodefiles\NLPPRO\ai-privacy-compliance-checker\backend\data\chroma_rag")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(DB_DIR, exist_ok=True)

model = SentenceTransformer("all-MiniLM-L6-v2")
chroma_client = chromadb.PersistentClient(path=str(DB_DIR))

if "privacy_rules" in [c.name for c in chroma_client.list_collections()]:
    chroma_client.delete_collection("privacy_rules")
collection = chroma_client.create_collection("privacy_rules")

def chunk_text(txt, chunk_size=800):
    txt = re.sub(r"\s+", " ", txt)
    return [txt[i:i+chunk_size] for i in range(0, len(txt), chunk_size)]

def extract_text_from_pdf(pdf_path):
    try:
        return extract_text(str(pdf_path))
    except Exception as e:
        print("Error reading", pdf_path, e)
        return ""

for pdf in DATA_DIR.glob("*.pdf"):
    print("📘 Ingesting:", pdf.name)
    txt = extract_text_from_pdf(pdf)
    chunks = chunk_text(txt)
    embs = model.encode(chunks)
    collection.add(
        documents=chunks,
        embeddings=[e.tolist() for e in embs],
        metadatas=[{"source": pdf.name, "chunk": i} for i in range(len(chunks))],
        ids=[f"{pdf.stem}_{i}" for i in range(len(chunks))]
    )

print("✅ Ingestion complete.")
