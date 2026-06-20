import Link from "next/link";
import { Movie } from "@/types/movie";

interface Props {
    movie: Movie;
}

export default function MovieCard({ movie }: Props) {

    return (

        <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition">

            <h2 className="text-xl font-bold">

                {movie.title}

            </h2>

            <p className="mt-2">

                ⭐ {movie.imdb_rating}

            </p>

            <p className="text-gray-600 mt-2">

                {movie.genre}

            </p>

            <Link href={`/movies/${movie.id}`}>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">

                    View Details

                </button>

            </Link>

        </div>

    );

}