from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.services.movie_service import MovieService

router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)


@router.get("/")
def get_movies(
    db: Session = Depends(get_db)
):
    return MovieService.get_movies(db)


@router.get("/{movie_id}")
def get_movie(
    movie_id: int,
    db: Session = Depends(get_db)
):
    return MovieService.get_movie(
        db,
        movie_id
    )


@router.get("/search/")
def search_movies(
    title: str,
    db: Session = Depends(get_db)
):
    return MovieService.search_movies(
        db,
        title
    )


@router.get("/genre/{genre}")
def filter_genre(
    genre: str,
    db: Session = Depends(get_db)
):
    return MovieService.filter_genre(
        db,
        genre
    )


@router.get("/top-rated")
def top_movies(
    db: Session = Depends(get_db)
):
    return MovieService.top_movies(db)


@router.get("/latest")
def latest_movies(
    db: Session = Depends(get_db)
):
    return MovieService.latest_movies(db)


@router.get("/filter")
def filter_movies(
    page: int = 1,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    return MovieService.filter_movies(
        db,
        page,
        limit
    )