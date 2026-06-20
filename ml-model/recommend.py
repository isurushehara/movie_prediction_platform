import joblib

# Load saved files
movies = joblib.load("models/movies.pkl")
similarity = joblib.load("models/similarity.pkl")


def recommend(movie_name):

    # Check whether the movie exists
    if movie_name not in movies["MOVIES"].values:
        return ["Movie not found"]

    # Get movie index
    index = movies[movies["MOVIES"] == movie_name].index[0]

    # Similarity scores
    distances = similarity[index]

    # Sort by similarity
    movie_list = sorted(
        list(enumerate(distances)),
        key=lambda x: x[1],
        reverse=True
    )[1:11]

    recommendations = []

    for movie in movie_list:
        recommendations.append(
            movies.iloc[movie[0]]["MOVIES"]
        )

    return recommendations


if __name__ == "__main__":

    movie = input("Enter movie name: ")

    recommendations = recommend(movie)

    print("\nRecommended Movies:\n")

    for i, rec in enumerate(recommendations, start=1):
        print(f"{i}. {rec}")