import os
import shutil
import fitz  # PyMuPDF
from fastapi import APIRouter, File, UploadFile
from pydantic import BaseModel

from app.services.groq_service import extract_complaint_data

router = APIRouter()


class ComplaintText(BaseModel):
    text: str


UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    # Save uploaded PDF
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text using PyMuPDF
    pdf = fitz.open(file_path)

    extracted_text = ""

    for page in pdf:
        extracted_text += page.get_text()

    pdf.close()

    # Extract structured complaint data using Groq AI
    complaint_data = extract_complaint_data(extracted_text)

    return {
        "message": "PDF processed successfully",
        "data": complaint_data,
    }


@router.post("/extract-text")
async def extract_text(data: ComplaintText):
    complaint_data = extract_complaint_data(data.text)

    print("================================")
    print("Complaint Data Sent To Frontend:")
    print(complaint_data)
    print("================================")

    return {
        "message": "Complaint processed successfully",
        "data": complaint_data,
    }