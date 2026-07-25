# 🧠 AIVOA – AI-Powered Pharmaceutical Complaint Management System

An AI-powered Pharmaceutical Complaint Management System that automates complaint extraction, AI-based quality assessment, intelligent complaint updates, and complaint management using **React, FastAPI, LangGraph, Groq LLM, and MySQL**.

---

# 📖 Project Overview

AIVOA (AI Voice of Assurance) is an intelligent Pharmaceutical Complaint Management System designed to simplify and automate the complaint handling process.

Users can upload pharmaceutical complaint PDFs or manually enter complaint text. The system uses AI to extract structured complaint information, generate quality assessments, answer complaint-related questions, and intelligently update complaint fields using natural language.

The project integrates **LangGraph** to orchestrate AI workflows, making the application modular, scalable, and easier to extend with future AI capabilities.

---

# ✨ Features

## 📄 Complaint Processing

- Upload Complaint PDF
- Extract text using PyMuPDF
- Manual Complaint Text Input
- AI-powered Complaint Information Extraction
- Automatic Complaint Form Filling

---

## 🤖 AI Quality Assessment

Automatically generates:

- Initial Severity
- Suggested Action
- Written Assessment

---

## 💬 AI Complaint Assistant

Supports:

- Complaint Summary
- Severity Analysis
- Batch Number Queries
- Manufacturing Date Queries
- Expiry Date Queries
- Missing Information Detection
- Suggested Next Actions
- Complaint Investigation Assistance
- Natural Language Complaint Field Updates

Example:

```
The batch number is BMX240602.
```

The AI automatically updates only the relevant complaint field.

---

## 📋 Complaint Management

- Save Complaint
- Complaint History
- Status Tracking
- View Complaint Details
- AI-generated Complaint Assessment

---

# 🚀 Technology Stack

## Frontend

- React.js
- Vite
- Axios
- CSS

---

## Backend

- FastAPI
- Python

---

## AI

- LangGraph
- Groq API
- Llama-3.3-70B-Versatile

---

## Database

- MySQL
- SQLAlchemy

---

## PDF Processing

- PyMuPDF (fitz)

---

# 📂 Project Structure

```
AIVOA
│
├── backend
│   ├── app
│   │
│   ├── api
│   │   ├── upload.py
│   │   ├── complaint.py
│   │   ├── chat.py
│   │   ├── update.py
│   │   └── complaints.py
│   │
│   ├── graph
│   │   └── complaint_graph.py
│   │
│   ├── database
│   ├── models
│   ├── schemas
│   │
│   ├── services
│   │   └── groq_service.py
│   │
│   └── main.py
│
├── uploads
│
├── frontend
│   ├── src
│   │
│   ├── components
│   │   ├── ComplaintForm.jsx
│   │   ├── ComplaintHistory.jsx
│   │   ├── AIAssistant.jsx
│   │   └── Navbar.jsx
│   │
│   ├── api.js
│   ├── App.jsx
│   └── main.jsx
│
├── requirements.txt
├── README.md
└── .env
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/AIVOA.git

cd AIVOA
```

---

# Backend Setup

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux/macOS

```bash
source venv/bin/activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Configure Environment Variables

Create a `.env` file inside the backend directory.

```env
GROQ_API_KEY=your_groq_api_key

DATABASE_URL=mysql+pymysql://username:password@localhost/aivoa_complaints
```

---

# Database Setup

Create Database

```sql
CREATE DATABASE aivoa_complaints;
```

Run your SQLAlchemy models or create the complaints table manually.

---

# Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

# Run Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📡 REST API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload PDF |
| POST | `/api/extract-text` | Extract Complaint Information |
| POST | `/api/chat` | AI Complaint Assistant |
| POST | `/api/update-fields` | Update Complaint Fields |
| POST | `/api/complaints` | Save Complaint |
| GET | `/api/complaints` | Complaint History |

---

# 🤖 LangGraph AI Workflow

```
                 User Input
       (PDF / Text / Chat / Update)
                    │
                    ▼
              FastAPI Backend
                    │
                    ▼
            LangGraph Router Node
                    │
      ┌─────────────┼──────────────┐
      │             │              │
      ▼             ▼              ▼
Extract Node    Chat Node     Update Node
      │             │              │
      └─────────────┼──────────────┘
                    │
                    ▼
              Groq LLM API
                    │
                    ▼
          AI Generated Response
                    │
                    ▼
             React Frontend
```

---

# 🏗 System Architecture

```
                React Frontend
                      │
                  Axios API
                      │
                 FastAPI Backend
                      │
                 LangGraph Router
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
     Extract      Chat Node   Update Node
          │           │           │
          └───────────┼───────────┘
                      ▼
                 Groq LLM API
                      │
        ┌─────────────┴─────────────┐
        │                           │
Structured Complaint         AI Assessment
        │                           │
        └─────────────┬─────────────┘
                      ▼
                 MySQL Database
                      │
                      ▼
               Complaint History
```

---

# 🧠 Why LangGraph?

LangGraph is used as an AI orchestration framework.

Instead of every API calling the LLM directly, LangGraph routes requests to specialised AI nodes.

Current Nodes:

- Router Node
- Complaint Extraction Node
- AI Chat Node
- Complaint Update Node

Benefits:

- Modular AI architecture
- Easy to add new AI workflows
- Better maintainability
- Scalable workflow orchestration
- Industry-standard AI design pattern

---

# 🚀 Future Enhancements

- User Authentication
- OCR for Scanned PDFs
- AI Root Cause Analysis
- Dashboard Analytics
- Complaint Trend Prediction
- Email Notifications
- Export to Excel
- Export to PDF
- Multi-language Complaint Processing
- Role-Based Access Control (RBAC)
- Human Approval Workflow
- Retrieval-Augmented Generation (RAG)

---

# 👨‍💻 Author

**Digvijaysing Devendra Rajput**

---

# 📜 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- LangGraph
- Groq API
- FastAPI
- React.js
- SQLAlchemy
- MySQL
- PyMuPDF

---

# ⭐ Key Highlights

- ✅ AI-powered Pharmaceutical Complaint Extraction
- ✅ LangGraph-based AI Workflow Orchestration
- ✅ AI-generated Quality Assessment
- ✅ AI Complaint Assistant
- ✅ Natural Language Complaint Updates
- ✅ FastAPI REST APIs
- ✅ React + Vite Frontend
- ✅ MySQL Database Integration
- ✅ PDF Processing with PyMuPDF
- ✅ Modular AI Architecture
- ✅ End-to-End Pharmaceutical Complaint Management System
