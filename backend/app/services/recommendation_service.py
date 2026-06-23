import os
import joblib

from sqlalchemy.orm import Session

from app.repositories.rating_repository import (
    RatingRepository
)


class RecommendationService:

    BASE_DIR = os.path.dirname(
        os.path.abspath(__file__)
    )

    PROJECT_ROOT = os.path.abspath(
        os.path.join(
            BASE_DIR,
            "..",
            "..",
            ".."
        )
    )

    MODEL_DIR = os.path.join(
        PROJECT_ROOT,
        "ml-model",
        "models"
    )

    movies = joblib.load(
        os.path.join(
            MODEL_DIR,
            "movies.pkl"
        )
    )

    similarity = joblib.load(
        os.path.join(
            MODEL_DIR,
            "similarity.pkl"
        )
    )

    @classmethod
    def recommend_movie(
        cls,
        movie_name: str
    ):

        index = cls.movies[
            cls.movies["MOVIES"] == movie_name
        ].index[0]

        distances = cls.similarity[index]

        movie_list = sorted(
            list(enumerate(distances)),
            reverse=True,
            key=lambda x: x[1]
        )[1:11]

        result = []

        for movie in movie_list:

            result.append(
                cls.movies.iloc[
                    movie[0]
                ].MOVIES
            )

        return result

    @classmethod
    def personalized_recommendation(
        cls,
        db: Session,
        user_id: int
    ):

        ratings = (
            RatingRepository
            .get_user_high_ratings(
                db,
                user_id
            )
        )

        if len(ratings) == 0:

            return {
                "message":
                "No ratings found for this user."
            }

        watched_movies = []
        scores = {}

        for rating in ratings:

            watched_movies.append(
                rating.movie_id
            )

            index = rating.movie_id - 1

            distances = cls.similarity[
                index
            ]

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

            movie = cls.movies.iloc[
                movie_id - 1
            ]

            result.append({
                "movie_id": int(movie_id),
                "title": movie["MOVIES"],
                "score": round(
                    float(score),
                    4
                )
            })

        return result