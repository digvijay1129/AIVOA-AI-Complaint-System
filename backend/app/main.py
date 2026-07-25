from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.api.complaint import router as complaint_router
from app.api.update import router as update_router
from app.api.upload import router as upload_router
from app.database.database import Base, engine
from app.models.complaint import Complaint

# Automatically create database tables if they don't exist
Base.metadata.create_all(bind=engine)

# Initialize FastAPI application
app = FastAPI(title="AIVOA Complaint Management API")

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite/React default dev server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(upload_router, prefix="/api")
app.include_router(complaint_router, prefix="/api")
app.include_router(chat_router, prefix="/api")
app.include_router(update_router, prefix="/api")


@app.get("/")
def root():
    with engine.connect() as connection:
        return {"message": "Backend and MySQL connected successfully!"}