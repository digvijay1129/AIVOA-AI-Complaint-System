from fastapi import FastAPI
from app.database.database import engine

app = FastAPI(title="AIVOA Complaint Management API")

@app.get("/")
def root():
    with engine.connect() as connection:
        return {
            "message": "Backend and MySQL connected successfully!"
        }