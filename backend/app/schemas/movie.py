from pydantic import BaseModel

class MovieResponse(BaseModel):

    id: int
    title: str
    year: str | None = None
    genre: str | None = None
    imdb_rating: float | None = None
    description: str | None = None
    stars: str | None = None
    votes: str | None = None
    runtime: int | None = None
    gross: str | None = None

    class Config:
        from_attributes = True