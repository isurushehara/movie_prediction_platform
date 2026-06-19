from sqlalchemy import Column, Integer, String, Float, Text
from app.database.base import Base

class Movie(Base):

    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255))

    year = Column(String(30))

    genre = Column(Text)

    imdb_rating = Column(Float)

    description = Column(Text)

    stars = Column(Text)

    votes = Column(String(50))

    runtime = Column(Integer)

    gross = Column(String(50))