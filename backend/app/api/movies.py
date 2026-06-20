from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc

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

    movies = db.query(Movie).limit(20).all()

    return movies


@router.get("/{movie_id}")
def get_movie(

    movie_id: int,

    db: Session = Depends(get_db)

):

    movie = db.query(Movie).filter(
        Movie.id == movie_id
    ).first()

    if not movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    return movie

@router.get("/search/")
def search_movies(

    title: str,

    db: Session = Depends(get_db)

):

    movies = db.query(Movie).filter(

        Movie.title.ilike(f"%{title}%")

    ).all()

    return movies

@router.get("/genre/{genre}")
def filter_genre(

    genre: str,

    db: Session = Depends(get_db)

):

    return db.query(Movie).filter(

        Movie.genre.ilike(f"%{genre}%")

    ).all()

@router.get("/top-rated")
def top_movies(

    db: Session = Depends(get_db)

):

    return db.query(Movie).order_by(

        desc(Movie.imdb_rating)

    ).limit(20).all()

@router.get("/latest")
def latest_movies(

    db: Session = Depends(get_db)

):

    return db.query(Movie).order_by(

        desc(Movie.release_year)

    ).limit(20).all()

@router.get("/filter")
def filter_movies(

    page: int = 1,

    limit: int = 20,

    db: Session = Depends(get_db)

):

    offset = (page - 1) * limit

    return db.query(Movie).offset(offset).limit(limit).all()