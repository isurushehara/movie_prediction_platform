import api from "@/services/api";

export const RatingService = {

    createRating(
        userId: number,
        movieId: number,
        rating: number
    ) {
        return api.post(
            "/ratings/",
            {
                user_id: userId,
                movie_id: movieId,
                rating
            }
        );
    }
};