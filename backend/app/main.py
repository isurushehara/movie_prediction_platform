from fastapi import FastAPI

from app.api.movies import router as movie_router

app = FastAPI(
    title="Movie Recommendation API"
)

app.include_router(movie_router)

@app.get("/")
def home():
    return {
        "message": "Movie Recommendation API"
    }