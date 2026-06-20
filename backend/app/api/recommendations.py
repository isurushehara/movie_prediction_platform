from fastapi import APIRouter
import joblib
import os

from fastapi import APIRouter
import joblib
import os

router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)

# Current file directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Project root (movie_prediction)
PROJECT_ROOT = os.path.abspath(
    os.path.join(BASE_DIR, "..", "..", "..")
)

# ML model folder
MODEL_DIR = os.path.join(PROJECT_ROOT, "ml-model", "models")

movies = joblib.load(
    os.path.join(MODEL_DIR, "movies.pkl")
)

similarity = joblib.load(
    os.path.join(MODEL_DIR, "similarity.pkl")
)

router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)

movies = joblib.load(
    "../ml-model/models/movies.pkl"
)

similarity = joblib.load(
    "../ml-model/models/similarity.pkl"
)

@router.get("/{movie_name}")

def recommend_movie(

    movie_name: str

):

    index = movies[
        movies["MOVIES"] == movie_name
    ].index[0]

    distances = similarity[index]

    movie_list = sorted(

        list(enumerate(distances)),

        reverse=True,

        key=lambda x: x[1]

    )[1:11]

    result = []

    for movie in movie_list:

        result.append(

            movies.iloc[movie[0]].MOVIES

        )

    return result