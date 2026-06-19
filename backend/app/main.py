from fastapi import FastAPI

from app.api.auth import router as auth_router

app = FastAPI(
    title="Movie Recommendation API"
)

app.include_router(auth_router)


@app.get("/")
def home():

    return {
        "message": "API Running Successfully"
    }