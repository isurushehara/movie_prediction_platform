from fastapi import APIRouter

from app.services.recommendation_service import (
    RecommendationService
)

router = APIRouter(
    prefix="/recommend",
    tags=["Recommendation"]
)


@router.get("/{movie_name}")
def recommend_movie(
    movie_name: str
):
    return RecommendationService.recommend_movie(
        movie_name
    )