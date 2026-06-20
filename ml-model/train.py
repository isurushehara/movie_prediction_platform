import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load dataset
df = pd.read_csv("dataset/clean_movies.csv")

# Fill missing values
df["combined_features"] = df["combined_features"].fillna("")

# Create TF-IDF Vectorizer
tfidf = TfidfVectorizer(
    stop_words="english",
    max_features=10000,
    ngram_range=(1, 2),
    min_df=2,
    max_df=0.8
)

# Transform text into vectors
matrix = tfidf.fit_transform(df["combined_features"])

print("Dataset Shape:", df.shape)
print("TF-IDF Matrix Shape:", matrix.shape)

similarity = cosine_similarity(matrix)

print(similarity.shape)

import joblib

joblib.dump(
    tfidf,
    "models/tfidf.pkl"
)

joblib.dump(
    similarity,
    "models/similarity.pkl"
)

joblib.dump(
    df,
    "models/movies.pkl"
)

print("Model saved successfully.")