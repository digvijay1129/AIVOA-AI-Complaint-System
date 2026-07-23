from fastapi import FastAPI

app = FastAPI(title="AIVOA Complaint Management API")

@app.get("/")
def root():
    return {
        "message": "Backend is running successfully!"
    }