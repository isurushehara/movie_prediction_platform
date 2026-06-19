import pandas as pd
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.connection import SessionLocal
from app.models.movie import Movie

# Read CSV
df = pd.read_csv("dataset/clean_movies.csv")

# ----------------------------
# Replace NaN values
# ----------------------------

text_columns = [
    "MOVIES",
    "YEAR",
    "GENRE",
    "ONE-LINE",
    "DIRECTOR",
    "ACTORS",
    "combined_features"
]

for col in text_columns:
    df[col] = df[col].fillna("")

numeric_columns = [
    "release_year",
    "RATING",
    "VOTES",
    "RunTime",
    "Gross"
]

for col in numeric_columns:
    df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)

# ----------------------------
# Connect Database
# ----------------------------

db = SessionLocal()

# Delete old records
db.query(Movie).delete()
db.commit()

# ----------------------------
# Import Data
# ----------------------------

for _, row in df.iterrows():

    movie = Movie(

        title=row["MOVIES"],

        year=row["YEAR"],

        release_year=int(row["release_year"]),

        genre=row["GENRE"],

        imdb_rating=float(row["RATING"]),

        description=row["ONE-LINE"],

        director=row["DIRECTOR"],

        actors=row["ACTORS"],

        votes=int(row["VOTES"]),

        runtime=int(row["RunTime"]),

        gross=float(row["Gross"]),

        combined_features=row["combined_features"]

    )

    db.add(movie)

db.commit()
db.close()

print("Movies imported successfully!")