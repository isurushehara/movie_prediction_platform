from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.movie import Movie


class MovieRepository:

    @staticmethod
    def get_all(db: Session):
        return db.query(Movie).limit(20).all()

    @staticmethod
    def get_by_id(
        db: Session,
        movie_id: int
    ):
        return (
            db.query(Movie)
            .filter(Movie.id == movie_id)
            .first()
        )

    @staticmethod
    def search_by_title(
        db: Session,
        title: str
    ):
        return (
            db.query(Movie)
            .filter(Movie.title.ilike(f"%{title}%"))
            .all()
        )

    @staticmethod
    def filter_by_genre(
        db: Session,
        genre: str
    ):
        return (
            db.query(Movie)
            .filter(Movie.genre.ilike(f"%{genre}%"))
            .all()
        )

    @staticmethod
    def get_top_rated(
        db: Session
    ):
        return (
            db.query(Movie)
            .order_by(desc(Movie.imdb_rating))
            .limit(20)
            .all()
        )

    @staticmethod
    def get_latest(
        db: Session
    ):
        return (
            db.query(Movie)
            .order_by(desc(Movie.release_year))
            .limit(20)
            .all()
        )

    @staticmethod
    def get_paginated(
        db: Session,
        page: int,
        limit: int
    ):
        offset = (page - 1) * limit

        return (
            db.query(Movie)
            .offset(offset)
            .limit(limit)
            .all()
        )