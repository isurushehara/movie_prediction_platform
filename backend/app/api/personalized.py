from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.services.recommendation_service import (
    RecommendationService
)

router = APIRouter(
    prefix="/personalized",
    tags=["Personalized Recommendation"]
)


@router.get("/{user_id}")
def personalized_recommendation(
    user_id: int,
    db: Session = Depends(get_db)
):

    return (
        RecommendationService
        .personalized_recommendation(
            db,
            user_id
        )
    )