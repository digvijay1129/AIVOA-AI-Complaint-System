from fastapi import APIRouter
from pydantic import BaseModel

from app.services.groq_service import ask_complaint_question

router = APIRouter()


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
def chat(request: ChatRequest):

    answer = ask_complaint_question(request.question)

    return {
        "answer": answer
    }