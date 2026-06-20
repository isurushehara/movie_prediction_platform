from fastapi import FastAPI

from app.api.movies import router as movie_router
from app.api.recommendations import router as recommendation_router
from app.api.ratings import router as rating_router
from app.api.personalized import router as personalized_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Movie Recommendation API")

app.add_middleware(

    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)


app.include_router(personalized_router)
app.include_router(movie_router)
app.include_router(recommendation_router)
app.include_router(rating_router)

@app.get("/")
def home():
    return {"message": "Movie Recommendation API"}