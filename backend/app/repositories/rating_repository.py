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

    @staticmethod
    def get_user_high_ratings(
        db: Session,
        user_id: int
    ):
        return (
            db.query(Rating)
            .filter(
                Rating.user_id == user_id,
                Rating.rating >= 4
            )
            .all()
        )