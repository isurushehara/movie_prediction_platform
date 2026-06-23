import api from "@/services/api";

export const MovieService = {

    getMovies() {
        return api.get("/movies");
    },

    getMovie(id: string) {
        return api.get(`/movies/${id}`);
    }
};