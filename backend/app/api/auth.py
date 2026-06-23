from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.schemas.user import UserCreate
from app.schemas.user import UserLogin

from app.services.auth_service import (
    AuthService
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    return AuthService.register(
        db,
        user
    )


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    return AuthService.login(
        db,
        user
    )