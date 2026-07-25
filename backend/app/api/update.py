from fastapi import APIRouter
from pydantic import BaseModel

from app.services.groq_service import update_complaint_fields

router = APIRouter()


class UpdateRequest(BaseModel):
    current_data: dict
    message: str


@router.post("/update-fields")
async def update_fields(data: UpdateRequest):

    updated_fields = update_complaint_fields(
        data.current_data,
        data.message
    )

    return {
        "message": "Fields updated successfully",
        "updated_fields": updated_fields
    }