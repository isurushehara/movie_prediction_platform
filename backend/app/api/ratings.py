from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

# Import all related models
from app.models.user import User
from app.models.movie import Movie
from app.models.rating import Rating

from app.schemas.rating import RatingCreate

router = APIRouter(
    prefix="/ratings",
    tags=["Ratings"]
)

@router.post("/")
def add_rating(
    data: RatingCreate,
    db: Session = Depends(get_db)
):

    rating = Rating(
        user_id=data.user_id,
        movie_id=data.movie_id,
        rating=data.rating
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return {
        "message": "Rating saved successfully",
        "rating_id": rating.id
    }