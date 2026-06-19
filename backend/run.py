from app.database.connection import engine
from app.database.base import Base
from app.models.movie import Movie

from app.models.user import User

Base.metadata.create_all(bind=engine)

print("Database tables created successfully.")