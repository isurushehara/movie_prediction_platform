import Link from "next/link";
import { Movie } from "@/types/movie";

interface Props {
    movie: Movie;
}

export default function MovieCard({ movie }: Props) {

    return (

        <div
            className="
            bg-slate-800
            rounded-2xl
            overflow-hidden
            shadow-lg
            hover:shadow-blue-500/20
            hover:scale-105
            transition-all
            duration-300
        "
        >

            {/* Poster Placeholder */}

            <div
                className="
                h-64
                bg-gradient-to-br
                from-blue-600
                to-purple-700
                flex
                items-center
                justify-center
                text-6xl
            "
            >

                🎬

            </div>

            <div className="p-5">

                <h2
                    className="
                    text-xl
                    font-bold
                    text-white
                    line-clamp-2
                    min-h-[56px]
                "
                >

                    {movie.title}

                </h2>

                <div className="mt-4 flex items-center justify-between">

                    <span
                        className="
                        bg-yellow-500/20
                        text-yellow-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-medium
                    "
                    >

                        ⭐ {movie.imdb_rating}

                    </span>

                </div>

                <p
                    className="
                    text-slate-400
                    mt-4
                    text-sm
                    line-clamp-2
                "
                >

                    {movie.genre}

                </p>

                <Link href={`/movies/${movie.id}`}>

                    <button
                        className="
                        mt-6
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        transition
                        text-white
                        py-3
                        rounded-xl
                        font-medium
                    "
                    >

                        View Details

                    </button>

                </Link>

            </div>

        </div>

    );
}