"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/services/api";
import { Movie } from "@/features/movies/types/movie";
import { MovieService } from "@/features/movies/services/movie";
import RatingStars from "@/components/RatingStars";
import { RatingService } from "@/features/ratings/services/rating";
import { getCurrentUser } from "@/features/auth/services/auth";

export default function MovieDetailsPage() {
    const params = useParams();
    const id = params.id;

    const [movie, setMovie] = useState<Movie | null>(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);

    const user = getCurrentUser();

    useEffect(() => {
        MovieService
            .getMovie(String(id))
            .then((res) => {
                setMovie(res.data);
            })
            .catch(console.error);
    }, [id]);

    if (!movie) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="
              animate-spin
              rounded-full
              h-14
              w-14
              border-4
              border-stone-200
              border-t-emerald-500
              mx-auto
            "
                    />
                    <p className="text-stone-500 mt-6">Loading movie...</p>
                </div>
            </div>
        );
    }

    const submitRating = async (rating: number) => {
        if (!movie) return;

        try {
            if (!user) {
                alert("Please login first");
                return;
            }

            await RatingService.createRating(
                user.user_id,
                movie.id,
                rating
            );

            alert("Rating saved successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to save rating.");
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald-200/30 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] rounded-full bg-amber-200/40 blur-[100px]" />
            </div>

            {/* Hero Section */}
            <section className="border-b border-stone-200 bg-white/40 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Poster */}
                        <div
                            className="
                relative
                h-[400px] md:h-[450px]
                rounded-2xl
                bg-gradient-to-br
                from-emerald-400
                via-teal-400
                to-amber-300
                flex
                items-center
                justify-center
                text-8xl
                shadow-xl
                overflow-hidden
              "
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]" />
                            <span className="relative drop-shadow-md">🎬</span>
                        </div>

                        {/* Movie Info */}
                        <div className="md:col-span-2">
                            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
                                {movie.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mt-6">
                                <span className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    ⭐ {movie.imdb_rating}
                                </span>

                                <span className="bg-teal-50 border border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    📅 {movie.release_year}
                                </span>
                            </div>

                            <div className="mt-8 space-y-3">
                                <p className="text-stone-600">
                                    <span className="font-semibold text-stone-900">Genre:</span>{" "}
                                    {movie.genre}
                                </p>

                                <p className="text-stone-600">
                                    <span className="font-semibold text-stone-900">
                                        Director:
                                    </span>{" "}
                                    {movie.director || "Unknown"}
                                </p>

                                <p className="text-stone-600">
                                    <span className="font-semibold text-stone-900">Cast:</span>{" "}
                                    {movie.actors || "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-900">
                        📖 Description
                    </h2>

                    <p className="text-stone-600 leading-8 text-lg">
                        {movie.description}
                    </p>
                </div>
            </section>

            {/* Rating */}
            <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-12">
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-stone-900">
                        ⭐ Rate This Movie
                    </h2>

                    {user ? (
                        <RatingStars onRate={submitRating} />
                    ) : (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-4">
                            Please login to rate movies.
                        </div>
                    )}
                </div>
            </section>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-stone-900">
                        🎯 Similar Movies
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {recommendations.map((title, index) => (
                            <div
                                key={index}
                                className="
                  group
                  bg-white
                  border border-stone-200
                  rounded-xl
                  p-5
                  hover:border-stone-300
                  hover:shadow-lg hover:-translate-y-1
                  transition-all
                  duration-300
                "
                            >
                                <div
                                    className="
                    relative
                    h-36
                    bg-gradient-to-br
                    from-emerald-400
                    via-teal-400
                    to-amber-300
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-4xl
                    mb-4
                    overflow-hidden
                  "
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_50%)]" />
                                    <span className="relative transition-transform duration-300 group-hover:scale-110">
                                        🎬
                                    </span>
                                </div>

                                <h3 className="font-semibold text-stone-900">{title}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}