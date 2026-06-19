from sqlalchemy import Column, Integer, String, Float, Text
from app.database.base import Base

class Movie(Base):

    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    year = Column(String(30))

    release_year = Column(Integer)

    genre = Column(Text)

    imdb_rating = Column(Float)

    description = Column(Text)

    director = Column(Text)

    actors = Column(Text)

    votes = Column(Integer)

    runtime = Column(Integer)

    gross = Column(Float)

    combined_features = Column(Text)