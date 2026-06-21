import Link from "next/link";
import { Movie } from "@/types/movie";

interface Props {
    movie: Movie;
}

export default function MovieCard({ movie }: Props) {
    return (
        <div
            className="
        group
        relative
        bg-white
        border border-stone-200
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:border-stone-300
        hover:shadow-xl hover:shadow-emerald-900/5
        hover:-translate-y-1
        transition-all
        duration-300
      "
        >
            {/* Poster Placeholder */}
            <div
                className="
          relative
          h-56
          bg-gradient-to-br
          from-emerald-400
          via-teal-400
          to-amber-300
          flex
          items-center
          justify-center
          overflow-hidden
        "
            >
                {/* Decorative pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]" />

                <span className="text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                    🎬
                </span>

                {/* Rating badge floating on poster */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/85 backdrop-blur-sm border border-white/40 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-600 shadow-sm">
                    ⭐ {movie.imdb_rating}
                </div>
            </div>

            <div className="p-5">
                <h2 className="text-lg font-bold text-stone-900 line-clamp-2 min-h-[3rem] leading-snug">
                    {movie.title}
                </h2>

                <p className="text-stone-500 mt-2 text-sm line-clamp-1">
                    {movie.genre}
                </p>

                <Link href={`/movies/${movie.id}`} className="block mt-5">
                    <button
                        className="
              w-full
              bg-emerald-600
              hover:bg-emerald-500
              active:bg-emerald-700
              transition-colors
              text-white
              py-2.5
              rounded-xl
              font-medium
              text-sm
              flex items-center justify-center gap-1.5
              shadow-sm
            "
                    >
                        View Details
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                            →
                        </span>
                    </button>
                </Link>
            </div>
        </div>
    );
}