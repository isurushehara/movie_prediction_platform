from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.repositories.movie_repository import (
    MovieRepository
)


class MovieService:

    @staticmethod
    def get_movies(
        db: Session
    ):
        return MovieRepository.get_all(db)

    @staticmethod
    def get_movie(
        db: Session,
        movie_id: int
    ):
        movie = MovieRepository.get_by_id(
            db,
            movie_id
        )

        if not movie:
            raise HTTPException(
                status_code=404,
                detail="Movie not found"
            )

        return movie

    @staticmethod
    def search_movies(
        db: Session,
        title: str
    ):
        return MovieRepository.search_by_title(
            db,
            title
        )

    @staticmethod
    def filter_genre(
        db: Session,
        genre: str
    ):
        return MovieRepository.filter_by_genre(
            db,
            genre
        )

    @staticmethod
    def top_movies(
        db: Session
    ):
        return MovieRepository.get_top_rated(db)

    @staticmethod
    def latest_movies(
        db: Session
    ):
        return MovieRepository.get_latest(db)

    @staticmethod
    def filter_movies(
        db: Session,
        page: int,
        limit: int
    ):
        return MovieRepository.get_paginated(
            db,
            page,
            limit
        )