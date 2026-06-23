from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.rating import RatingCreate
from app.services.rating_service import RatingService

router = APIRouter(
    prefix="/ratings",
    tags=["Ratings"]
)


@router.post("/")
def add_rating(
    data: RatingCreate,
    db: Session = Depends(get_db)
):

    rating = RatingService.create_rating(
        db,
        data
    )

    return {
        "message": "Rating saved successfully",
        "rating_id": rating.id
    }