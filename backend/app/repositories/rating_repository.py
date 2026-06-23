from sqlalchemy.orm import Session
from app.models.rating import Rating


class RatingRepository:

    @staticmethod
    def create(
        db: Session,
        rating: Rating
    ):
        db.add(rating)
        db.commit()
        db.refresh(rating)

        return rating