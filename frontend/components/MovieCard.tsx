import { Movie } from "@/types/movie";

interface Props {

    movie: Movie;

}

export default function MovieCard({ movie }: Props) {

    return (

        <div className="border rounded-lg p-4 shadow hover:shadow-xl">

            <h2 className="text-xl font-bold">

                {movie.title}

            </h2>

            <p className="mt-2">

                ⭐ {movie.imdb_rating}

            </p>

            <p className="text-gray-600">

                {movie.genre}

            </p>

        </div>

    );

}