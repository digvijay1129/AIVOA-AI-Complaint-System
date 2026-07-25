from datetime import datetime

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.graph.complaint_graph import graph
from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate

router = APIRouter()


class TextExtractRequest(BaseModel):
    text: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def parse_date(date_str):
    if not date_str:
        return None

    try:
        return datetime.strptime(date_str, "%Y-%m-%d").date()
    except Exception:
        return None


@router.post("/extract-complaint")
def extract_complaint(data: TextExtractRequest):
    result = graph.invoke(
        {
            "request_type": "extract",
            "input_text": data.text,
            "current_data": {},
            "result": {},
        }
    )
    return {
        "message": "Complaint extracted successfully",
        "data": result["result"],
    }


@router.post("/complaints")
def save_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db),
):
    new_complaint = Complaint(
        complaint_source=complaint.complaint_source,
        customer_name=complaint.customer_name,
        customer_email=None,
        product_name=complaint.product_name,
        product_strength=complaint.product_strength,
        batch_number=complaint.batch_number,
        manufacturing_date=parse_date(complaint.manufacturing_date),
        expiry_date=parse_date(complaint.expiry_date),
        affected_quantity=(
            int(complaint.quantity) if complaint.quantity else None
        ),
        complaint_category=None,
        complaint_description=complaint.description,
        initial_severity=None,
        suggested_action=None,
        written_assessment=None,
        status="Open",
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    return {
        "message": "Complaint saved successfully",
        "id": new_complaint.id,
    }


@router.get("/complaints")
def get_all_complaints(
    db: Session = Depends(get_db),
):
    complaints = db.query(Complaint).order_by(Complaint.id.desc()).all()

    result = []

    for complaint in complaints:
        result.append(
            {
                "id": complaint.id,
                "customer_name": complaint.customer_name,
                "product_name": complaint.product_name,
                "batch_number": complaint.batch_number,
                "status": complaint.status,
                "created_at": (
                    str(complaint.created_at)
                    if hasattr(complaint, "created_at")
                    else ""
                ),
            }
        )

    return result