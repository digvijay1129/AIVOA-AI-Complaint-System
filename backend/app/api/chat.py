from fastapi import APIRouter
from pydantic import BaseModel

from app.graph.complaint_graph import graph

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    result = graph.invoke(
        {
            "request_type": "chat",
            "input_text": request.question,
            "current_data": {},
            "result": {}
        }
    )

    return result["result"]