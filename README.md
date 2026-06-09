# NLP-Driven Privacy Policy Compliance Checker

An AI-powered Regulatory Technology (RegTech) platform that automates privacy policy compliance assessment using advanced Natural Language Processing (NLP), Transformer-based language models, Retrieval-Augmented Generation (RAG), and Explainable AI.

The system analyzes privacy policy clauses and classifies them into:

* ✅ Compliant
* ❌ Non-Compliant
* ⚠️ Ambiguous

while providing supporting regulatory citations and interpretable explanations.

---

## Overview

Organizations must comply with complex global privacy regulations such as GDPR, CCPA, HIPAA, DPDP, LGPD, PDPA, and APPI. Manual compliance reviews are time-consuming, expensive, and prone to inconsistencies.

This project introduces an NLP-driven compliance auditing platform that automatically evaluates privacy policy clauses using legal-domain transformer models and a regulatory knowledge base.

The platform combines:

* LegalBERT-based compliance classification
* Zero-shot transformer benchmarking
* Explainable AI using LIME
* Retrieval-Augmented Generation (RAG)
* Full-stack deployment with FastAPI and React

to create a scalable compliance auditing solution.

---

## Features

### NLP & Compliance

* Clause-Level Privacy Policy Analysis
* Automated Compliance Classification
* Multi-Regulation Support
* Legal-Domain Transformer Models
* Explainable Predictions with LIME
* Regulatory Evidence Retrieval using RAG

### Full-Stack Platform

* React + TypeScript Frontend
* FastAPI Backend
* ChromaDB Vector Database
* Dockerized Deployment
* Regulatory Document Knowledge Base
* Modular Architecture for Enterprise Integration

---

## Supported Regulations

* GDPR (General Data Protection Regulation)
* CCPA (California Consumer Privacy Act)
* HIPAA (Health Insurance Portability and Accountability Act)
* DPDP (Digital Personal Data Protection Act)
* LGPD (Lei Geral de Proteção de Dados)
* PDPA (Personal Data Protection Act)
* APPI (Act on the Protection of Personal Information)

---

## Dataset

### PPCD-2025 (Privacy Policy Compliance Dataset)

The Privacy Policy Compliance Dataset (PPCD-2025) was developed using privacy policies collected from 42 multinational organizations across:

* Healthcare
* Finance
* Technology
* E-Commerce
* Education

### Dataset Statistics

| Split      | Samples |
| ---------- | ------: |
| Train      |   4,164 |
| Validation |     520 |
| Test       |     521 |
| Total      |   5,205 |

### Dataset Features

| Feature    | Description                  |
| ---------- | ---------------------------- |
| text       | Privacy policy clause        |
| label      | Compliance category          |
| regulation | Applicable regulation        |
| article    | Regulatory article reference |
| confidence | Annotation confidence score  |
| source_doc | Source document identifier   |

### Compliance Labels

* Compliant
* Non-Compliant
* Ambiguous

### Dataset Availability

The PPCD-2025 dataset was developed as part of academic research. Due to copyright and compliance considerations involving source privacy policies, the complete dataset is not publicly distributed.

---

## Models Evaluated

| Model             | Type       |
| ----------------- | ---------- |
| LegalBERT         | Fine-Tuned |
| BART-Large-MNLI   | Zero-Shot  |
| DeBERTa-v3-MNLI   | Zero-Shot  |
| InLegalBERT       | Pretrained |
| RoBERTa Sentiment | Baseline   |

---

## Best Model Performance

### Fine-Tuned LegalBERT

| Metric               |  Score |
| -------------------- | -----: |
| Accuracy             | 90.18% |
| Macro F1 Score       | 90.64% |
| Macro Precision      | 91.08% |
| Macro Recall         | 90.51% |
| Non-Compliant Recall | 89.40% |

The model demonstrated strong performance in identifying regulatory violations while maintaining balanced classification across all compliance categories.

---

## Explainable AI

### LIME

Local Interpretable Model-Agnostic Explanations (LIME) highlight the words and phrases responsible for model predictions, enabling transparent compliance auditing.

### Retrieval-Augmented Generation (RAG)

The system retrieves relevant regulatory documents and legal references from a curated knowledge base to support compliance decisions with evidence-backed citations.

---

## Regulatory Knowledge Base

The RAG pipeline is built using official regulatory documents including:

* GDPR
* CCPA
* HIPAA
* LGPD
* PDPA
* APPI
* DPDP

These documents are stored in:

```text
backend/data/rag_pdfs/
```

and indexed using ChromaDB for semantic retrieval.

---

## System Architecture

```text
PDF Upload
     │
     ▼
Text Extraction
     │
     ▼
Preprocessing & Cleaning
     │
     ▼
Clause Segmentation
     │
     ▼
LegalBERT Classification
     │
     ▼
LIME Explainability
     │
     ▼
RAG Citation Retrieval
     │
     ▼
FastAPI Backend
     │
     ▼
React Frontend Dashboard
```

---

## Technology Stack

### Machine Learning & NLP

* Python
* PyTorch
* Hugging Face Transformers
* Scikit-Learn
* NLTK
* SpaCy
* Pandas

### Explainability & Retrieval

* LIME
* ChromaDB
* RAG Pipeline

### Backend

* FastAPI
* Uvicorn

### Frontend

* React
* TypeScript
* Vite

### DevOps

* Docker
* Docker Compose

---

## Project Structure

```text
privacy-policy-compliance-checker/
│
├── backend/
│   ├── app.py
│   ├── rag_ingest.py
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── data/
│   │   └── rag_pdfs/
│   └── static/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── package.json
│   └── Dockerfile
│
├── data/
│   ├── train.csv
│   ├── val.csv
│   ├── test.csv
│   └── dataset_after_balance.csv
│
├── notebooks/
│   └── train.ipynb
│
├── results/
│   ├── all_metrics_comparison.png
│   ├── cm_legalbert.png
│   └── ...
│
├── docs/
│   └── NLP_Project_Report.pdf
│
├── docker-compose.yml
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/privacy-policy-compliance-checker.git

cd privacy-policy-compliance-checker
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt
```

Run backend:

```bash
uvicorn app:app --reload
```

---

### Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

---

## Building the RAG Database

Generate the ChromaDB vector store:

```bash
python backend/rag_ingest.py
```

The vector database will be built from the regulatory PDFs stored in:

```text
backend/data/rag_pdfs/
```

---

## Model Weights

Pretrained model weights are intentionally excluded from this repository due to GitHub file size limitations.

The project utilizes:

* nlpaueb/legal-bert-base-uncased
* facebook/bart-large-mnli
* MoritzLaurer/DeBERTa-v3-base-mnli-fever-anli

These models can be downloaded automatically from Hugging Face when running the project.

---

## Applications

* Privacy Policy Auditing
* Regulatory Compliance Monitoring
* Legal Document Classification
* Enterprise Governance Systems
* RegTech Platforms
* Risk Assessment Solutions
* Automated Compliance Reporting

---

## Future Scope

* Multilingual Privacy Policy Analysis
* Real-Time Compliance Monitoring
* Large Language Model Integration
* Cloud-Native Deployment
* Continuous Compliance Auditing
* Cross-Jurisdiction Regulatory Mapping
* Enterprise Compliance Dashboards

---

## Research Contribution

This project demonstrates the effectiveness of legal-domain transformer models for automated compliance auditing. Through extensive benchmarking across multiple NLP architectures, the study highlights the advantages of domain-specific language models for privacy policy compliance classification.

Key contributions include:

* Development of the PPCD-2025 dataset
* Multi-model transformer benchmarking
* Explainable AI integration using LIME
* Regulatory retrieval using RAG
* Full-stack deployment architecture for RegTech applications

---

## Authors

* Priyanshi Faldu
* Shreyans Gadekar
* Lakshya Joshi
* Aryan Revankar

### Institution

Symbiosis Institute of Technology, Pune

Bachelor of Technology (B.Tech)

Artificial Intelligence and Machine Learning

---

## License

This project is intended for academic, educational, and research purposes.

Please cite this repository if you use the methodology or findings in your research.
