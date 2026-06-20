import { Movie } from "@/types/movie";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition">

            <h2 className="text-lg font-bold">
                {movie.title}
            </h2>

            <p className="text-yellow-500 mt-2">
                ⭐ {movie.imdb_rating}
            </p>

            <p className="text-gray-600 mt-2">
                {movie.genre}
            </p>

            <p className="text-sm text-gray-500 mt-2">
                {movie.release_year}
            </p>

        </div>
    );
}