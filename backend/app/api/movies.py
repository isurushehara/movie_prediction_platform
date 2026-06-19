from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.movie import Movie

router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)

@router.get("/")
def get_movies(
    db: Session = Depends(get_db)
):

    movies = db.query(Movie).all()

    return movies