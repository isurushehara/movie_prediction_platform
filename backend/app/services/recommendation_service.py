import os
import joblib


class RecommendationService:

    BASE_DIR = os.path.dirname(
        os.path.abspath(__file__)
    )

    PROJECT_ROOT = os.path.abspath(
        os.path.join(
            BASE_DIR,
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