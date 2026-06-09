# NLP-driven-Data-Protection-and-Privacy-Policy-Compliance-Checker-
NLP-driven Privacy Policy Compliance Checker that automatically classifies privacy policy clauses as Compliant, Non-Compliant, or Ambiguous using LegalBERT and transformer-based NLP. Features explainable AI (LIME), RAG-based regulatory citations, and automated compliance auditing across GDPR, CCPA, HIPAA, DPDP, and more.

# NLP-Driven Data Protection & Privacy Policy Compliance Checker

An AI-powered Regulatory Technology (RegTech) solution that automates privacy policy compliance assessment using advanced Natural Language Processing (NLP) and Transformer-based models.

The system analyzes privacy policy clauses and classifies them into:

- ✅ Compliant
- ❌ Non-Compliant
- ⚠️ Ambiguous

Designed for organizations operating under global data protection regulations, the system helps automate compliance audits, reduce manual effort, and improve regulatory transparency.

---

## Overview

Privacy policies are often lengthy, complex, and difficult to review manually against multiple regulations such as GDPR, CCPA, HIPAA, DPDP, LGPD, PDPA, and APPI.

This project introduces an NLP-based compliance checker that automatically evaluates privacy policy clauses and predicts their compliance status using domain-specific legal language models.

The solution combines:

- Legal-domain transformer models
- Explainable AI (LIME)
- Retrieval-Augmented Generation (RAG)
- Automated compliance auditing workflows

to provide accurate and transparent compliance assessments.

---

## Key Features

- Automated Privacy Policy Compliance Analysis
- Clause-Level Classification
- LegalBERT-Based Compliance Prediction
- Explainable AI with LIME
- Retrieval-Augmented Regulatory Citations (RAG)
- Multi-Model Comparative Evaluation
- Compliance Monitoring Across Multiple Regulations
- FastAPI Backend Integration
- React Frontend Dashboard
- PostgreSQL Database Support
- Redis Caching
- Dockerized Deployment
- Workflow Automation with n8n

---

## Supported Regulations

- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- HIPAA (Health Insurance Portability and Accountability Act)
- DPDP (Digital Personal Data Protection Act)
- LGPD (Lei Geral de Proteção de Dados)
- PDPA (Personal Data Protection Act)
- APPI (Act on the Protection of Personal Information)

---

## Dataset

### PPCD-2025 (Privacy Policy Compliance Dataset)

The Privacy Policy Compliance Dataset (PPCD-2025) was created from privacy policies collected from 42 multinational organizations across:

- Healthcare
- Finance
- Technology
- E-Commerce
- Education

### Dataset Statistics

| Split | Samples |
|---------|---------:|
| Train | 4,164 |
| Validation | 520 |
| Test | 521 |
| Total | 5,205 |

### Dataset Features

| Feature | Description |
|----------|-------------|
| text | Privacy policy clause |
| label | Compliance category |
| regulation | Applicable regulation |
| article | Regulatory article reference |
| confidence | Annotation confidence score |
| source_doc | Source document identifier |

### Compliance Labels

- Compliant
- Non-Compliant
- Ambiguous

### Dataset Availability

The PPCD-2025 dataset was developed as part of this academic research project. Due to copyright and compliance considerations involving privacy policy documents, the complete dataset is not publicly distributed.

---

## Methodology

### Data Preprocessing

- PDF Text Extraction using PyMuPDF and pdfminer
- Text Cleaning and Normalization
- Clause Segmentation using NLTK and SpaCy
- Duplicate Removal
- SMOTE-Based Class Balancing
- Stratified Dataset Splitting (80:10:10)

### Annotation Pipeline

1. Zero-shot pre-labeling using BART-Large-MNLI
2. Human validation using Label Studio
3. Manual review of selected samples
4. Quality assurance and balancing

---

## Models Evaluated

| Model | Type |
|---------|---------|
| LegalBERT | Fine-Tuned |
| BART-Large-MNLI | Zero-Shot |
| DeBERTa-v3-MNLI | Zero-Shot |
| InLegalBERT | Pretrained |
| RoBERTa Sentiment | Baseline |

---

## Best Model Performance

### Fine-Tuned LegalBERT

| Metric | Score |
|----------|----------:|
| Accuracy | 90.18% |
| Macro F1 Score | 90.64% |
| Macro Precision | 91.08% |
| Macro Recall | 90.51% |
| Non-Compliant Recall | 89.40% |

The model demonstrated strong performance in detecting regulatory violations while maintaining balanced classification across all compliance categories.

---

## Explainable AI

### LIME (Local Interpretable Model-Agnostic Explanations)

Provides word-level explanations that highlight which parts of a clause influenced the model's decision.

### Retrieval-Augmented Generation (RAG)

Retrieves relevant regulatory articles and compliance references to support predictions with evidence-based explanations.

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
LegalBERT Inference
     │
     ▼
LIME Explainability
     │
     ▼
RAG Citation Engine
     │
     ▼
FastAPI Backend
     │
     ▼
PostgreSQL + Redis
     │
     ▼
React Dashboard
```

---

## Technology Stack

### Machine Learning & NLP

- Python
- PyTorch
- Hugging Face Transformers
- Scikit-Learn
- NLTK
- SpaCy
- Pandas

### Explainability & Retrieval

- LIME
- FAISS
- RAG Pipeline

### Backend

- FastAPI
- PostgreSQL
- Redis

### Frontend

- React.js

### DevOps & Automation

- Docker
- n8n

---

## Project Structure

```text
privacy-policy-compliance-checker/
│
├── data/
├── notebooks/
├── models/
├── src/
│   ├── preprocessing/
│   ├── training/
│   ├── inference/
│   ├── explainability/
│   └── rag/
│
├── frontend/
├── backend/
├── requirements.txt
├── README.md
└── LICENSE
```

---

## Applications

- Privacy Policy Auditing
- Regulatory Compliance Monitoring
- Legal Document Classification
- Enterprise Governance Solutions
- Risk Assessment Systems
- RegTech Platforms
- Automated Compliance Reporting

---

## Future Scope

- Multilingual Privacy Policy Analysis
- Real-Time Compliance Monitoring
- Large Language Model Integration
- Cross-Jurisdiction Regulatory Mapping
- Cloud-Native Deployment
- Continuous Learning Pipelines
- Enterprise Compliance Dashboards

---

## Research Contribution

This project demonstrates the effectiveness of domain-specific transformer models for legal compliance analysis. Through extensive evaluation of multiple NLP architectures, the study shows that legal-domain language models significantly outperform general-purpose alternatives for privacy policy compliance classification.

The project contributes:

- A privacy policy compliance classification framework
- The PPCD-2025 compliance dataset
- Comparative evaluation of transformer architectures
- Explainable AI integration for regulatory auditing
- A scalable architecture suitable for enterprise RegTech applications

---

## Authors

**Priyanshi Faldu**  
**Shreyans Gadekar**  
**Lakshya Joshi**  
**Aryan Revankar**

### Institution

Symbiosis Institute of Technology, Pune

Bachelor of Technology (B.Tech)  
Artificial Intelligence and Machine Learning

---

## License

This project is intended for academic, educational, and research purposes.

Please cite this repository if you use the methodology or findings in your research.
