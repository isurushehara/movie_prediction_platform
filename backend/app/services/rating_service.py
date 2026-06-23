from sqlalchemy.orm import Session

from app.models.rating import Rating
from app.schemas.rating import RatingCreate

from app.repositories.rating_repository import (
    RatingRepository
)


class RatingService:

    @staticmethod
    def create_rating(
        db: Session,
        data: RatingCreate
    ):

        rating = Rating(
            user_id=data.user_id,
            movie_id=data.movie_id,
            rating=data.rating
        )

        return RatingRepository.create(
            db,
            rating
        )