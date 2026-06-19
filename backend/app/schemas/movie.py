from pydantic import BaseModel

class MovieResponse(BaseModel):

    id: int
    title: str
    year: str | None = None
    release_year: int | None = None
    genre: str | None = None
    imdb_rating: float | None = None
    description: str | None = None
    director: str | None = None
    actors: str | None = None
    votes: int | None = None
    runtime: int | None = None
    gross: float | None = None

    class Config:
        from_attributes = True