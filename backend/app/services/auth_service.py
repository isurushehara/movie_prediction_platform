from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.schemas.user import UserLogin

from app.repositories.user_repository import (
    UserRepository
)

from app.core.security import (
    hash_password,
    verify_password
)

from app.core.auth import (
    create_access_token
)


class AuthService:

    @staticmethod
    def register(
        db: Session,
        user: UserCreate
    ):

        existing_user = (
            UserRepository.get_by_email(
                db,
                user.email
            )
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        new_user = User(
            name=user.name,
            email=user.email,
            password=hash_password(
                user.password
            )
        )

        UserRepository.create(
            db,
            new_user
        )

        return {
            "message":
            "User registered successfully"
        }

    @staticmethod
    def login(
        db: Session,
        user: UserLogin
    ):

        db_user = (
            UserRepository.get_by_email(
                db,
                user.email
            )
        )

        if not db_user:
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        if not verify_password(
            user.password,
            db_user.password
        ):
            raise HTTPException(
                status_code=401,
                detail="Invalid email or password"
            )

        token = create_access_token({
            "sub": db_user.email,
            "user_id": db_user.id,
            "name": db_user.name
        })

        return {
            "access_token": token,
            "token_type": "bearer"
        }