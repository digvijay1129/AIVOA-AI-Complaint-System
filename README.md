# 🧠 AIVOA – AI-Powered Pharmaceutical Complaint Management System

An AI-powered Pharmaceutical Complaint Management System that automates complaint extraction, quality assessment, and complaint management using **React, FastAPI, MySQL, and Groq LLM**.

---

# 📖 Project Overview

AIVOA (AI Voice of Assurance) is designed to simplify pharmaceutical complaint management by leveraging Artificial Intelligence. Users can upload complaint PDFs or manually enter complaint details, and the system automatically extracts structured information, generates AI-based quality assessments, and stores complaints in a MySQL database.

The application also includes an AI Chat Assistant that can answer complaint-related questions and update complaint fields using natural language.

---

# ✨ Features

## 📄 Complaint Processing

- Upload Complaint PDF
- Manual Complaint Text Input
- AI-based Complaint Data Extraction
- Automatic Form Filling

---

## 🤖 AI Assessment

Automatically generates:

- Initial Severity
- Suggested Action
- Written Assessment

---

## 💬 AI Assistant

Supports:

- Complaint Summary
- Batch Number Queries
- Manufacturing Date Queries
- Expiry Date Queries
- Missing Information Detection
- Next Action Suggestions
- Complaint Field Updates using Natural Language

Example:

```
The batch number is BMX240602.
```

The AI automatically updates the Batch Number field.

---

## 📋 Complaint Management

- Save Complaint
- Complaint History
- Status Tracking
- View Complaint Details

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- Axios
- CSS

## Backend

- FastAPI
- Python

## Database

- MySQL
- SQLAlchemy

## AI

- Groq API
- Llama-3.3-70B-Versatile

## PDF Processing

- PyMuPDF (fitz)

---

# 📂 Project Structure

```
AIVOA
│
├── backend
│   ├── app
│   │   ├── api
│   │   │   ├── upload.py
│   │   │   ├── complaint.py
│   │   │   ├── chat.py
│   │   │   └── update.py
│   │   │
│   │   ├── database
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   │   └── groq_service.py
│   │   │
│   │   └── main.py
│   │
│   ├── uploads
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ComplaintForm.jsx
│   │   │   ├── ComplaintHistory.jsx
│   │   │   └── AIAssistant.jsx
│   │   │
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/AIVOA.git

cd AIVOA
```

---

## 2. Backend Setup

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Linux / macOS

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
GROQ_API_KEY=your_groq_api_key

DATABASE_URL=mysql+pymysql://username:password@localhost/aivoa_complaints
```

---

## 4. Database Setup

Create the database:

```sql
CREATE DATABASE aivoa_complaints;

USE aivoa_complaints;

CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_source VARCHAR(100),
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    product_name VARCHAR(255),
    product_strength VARCHAR(100),
    batch_number VARCHAR(100),
    manufacturing_date DATE,
    expiry_date DATE,
    affected_quantity INT,
    complaint_category VARCHAR(150),
    complaint_description TEXT,
    initial_severity VARCHAR(50),
    suggested_action TEXT,
    written_assessment TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

---

## 6. Run Frontend

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

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload PDF and extract complaint |
| POST | `/api/extract-text` | Extract complaint from text |
| POST | `/api/update-fields` | Update complaint fields using AI |
| POST | `/api/chat` | Ask AI questions |
| POST | `/api/complaints` | Save complaint |
| GET | `/api/complaints` | Retrieve complaint history |

---

# 🤖 AI Workflow

```
                PDF Upload / Manual Complaint
                            │
                            ▼
                Groq LLM Complaint Extraction
                            │
                            ▼
               Structured Complaint Information
                            │
                            ▼
                AI Quality Assessment Generation
                            │
                            ▼
                 Complaint Form Auto-Fill
                            │
                            ▼
                  Save Complaint to MySQL
                            │
                            ▼
                     Complaint History
                            │
                            ▼
                  AI Chat & Field Updates
```

---

# 🧩 Project Architecture

```
Frontend (React)
        │
        ▼
Axios API Calls
        │
        ▼
FastAPI Backend
        │
        ├──────────────┐
        ▼              ▼
Groq LLM          MySQL Database
        │              │
        └──────► Complaint Data
```

---

# 📸 Screenshots

Include screenshots of:

- Complaint Form
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e80bd515-9282-4853-9d6b-8a239dc29a27" />
  
- PDF Upload
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3b7456af-867d-4adf-943c-b6b9394dc75b" />

- AI Assistant
  <img width="611" height="895" alt="image" src="https://github.com/user-attachments/assets/bb47e6a3-c73c-4d7a-b805-33dbb5a93f47" />

- Complaint History
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a01b6780-cb15-43d5-a7c0-8e755073438d" />

- AI Assessment
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/6b8636fe-af8d-4c7e-8c44-630ecc65047c" />
  
- Chat
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1628c5c7-b5b3-4b92-961f-7b8b89b5c0f3" />

- Update Information
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a0c44510-4cfc-4d01-8666-bc42f1efbb2c" />


Example:

```
screenshots/
├── dashboard.png
├── upload.png
├── complaint-form.png
├── ai-chat.png
└── history.png
```

---

# 🚀 Future Enhancements

- User Authentication
- Dashboard Analytics
- Export to Excel/PDF
- Email Notifications
- AI Root Cause Analysis
- OCR Support for Scanned PDFs
- Role-Based Access Control
- Complaint Trend Analysis
- Field Highlighting after AI Updates

---

# 👨‍💻 Author

**Digvijaysing Devendra Rajput**

---

# 📜 License

This project is licensed under the **MIT License**.

---

## ⭐ Acknowledgements

- Groq API
- FastAPI
- React.js
- SQLAlchemy
- PyMuPDF
- MySQL

---

## 📌 Key Highlights

- ✅ AI-powered Pharmaceutical Complaint Extraction
- ✅ AI-generated Quality Assessment
- ✅ AI Complaint Assistant
- ✅ Natural Language Form Updates
- ✅ FastAPI REST APIs
- ✅ React-based Responsive UI
- ✅ MySQL Database Integration
- ✅ PDF Processing with PyMuPDF
- ✅ End-to-End Complaint Management Workflow
