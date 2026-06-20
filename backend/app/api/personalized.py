from fastapi import APIRouter
import joblib

from app.database.connection import SessionLocal
from app.models.rating import Rating

router = APIRouter(
    prefix="/personalized",
    tags=["Personalized Recommendation"]
)

# Load ML models
movies = joblib.load("../ml-model/models/movies.pkl")
similarity = joblib.load("../ml-model/models/similarity.pkl")

@router.get("/{user_id}")
def personalized_recommendation(user_id: int):

    db = SessionLocal()

    # Get movies rated 4 or 5 stars
    ratings = db.query(Rating).filter(
        Rating.user_id == user_id,
        Rating.rating >= 4
    ).all()

    if len(ratings) == 0:
        return {
            "message": "No ratings found for this user."
        }

    watched_movies = []
    scores = {}

    for rating in ratings:

        watched_movies.append(rating.movie_id)

        index = rating.movie_id - 1

        distances = similarity[index]

        similar_movies = sorted(
            list(enumerate(distances)),
            key=lambda x: x[1],
            reverse=True
        )[1:21]

        for movie, score in similar_movies:

            movie_id = movie + 1

            if movie_id in watched_movies:
                continue

            if movie_id in scores:
                scores[movie_id] += score
            else:
                scores[movie_id] = score

    recommendations = sorted(
        scores.items(),
        key=lambda x: x[1],
        reverse=True
    )[:10]

    result = []

    for movie_id, score in recommendations:

        movie = movies.iloc[movie_id - 1]

        result.append({

            "movie_id": int(movie_id),

            "title": movie["MOVIES"],

            "score": round(float(score), 4)

        })

    db.close()

    return result