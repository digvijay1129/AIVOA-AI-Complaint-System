from fastapi import APIRouter
from pydantic import BaseModel

from app.graph.complaint_graph import graph

router = APIRouter()


class UpdateRequest(BaseModel):
    current_data: dict
    message: str


@router.post("/update-fields")
async def update_fields(data: UpdateRequest):

    result = graph.invoke(
        {
            "request_type": "update",
            "input_text": data.message,
            "current_data": data.current_data,
            "result": {},
        }
    )
    
    updated_fields = result["result"]

    return {
        "message": "Fields updated successfully",
        "updated_fields": updated_fields,
    }