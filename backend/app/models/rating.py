from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database.base import Base

class Rating(Base):

    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    movie_id = Column(Integer, ForeignKey("movies.id"))

    rating = Column(Integer)

    created_at = Column(DateTime, server_default=func.now())