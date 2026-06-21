"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import api from "@/services/api";
import { Movie } from "@/types/movie";
import RatingStars from "@/components/RatingStars";
import { getCurrentUser } from "@/services/auth";

export default function MovieDetailsPage() {

    const params = useParams();

    const id = params.id;

    const [movie, setMovie] = useState<Movie | null>(null);

    const [recommendations, setRecommendations] = useState<string[]>([]);

    const user = getCurrentUser();

    useEffect(() => {

        api.get(`/movies/${id}`)

            .then((res) => {

                setMovie(res.data);

            })

            .catch(console.error);

    }, [id]);


    if (!movie) {

        return (

            <div className="p-10">

                Loading...

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

            await api.post("/ratings/", {

                user_id: user.user_id,

                movie_id: movie.id,

                rating: rating

            });

            alert("Rating saved successfully!");

        } catch (error) {

            console.error(error);

            alert("Failed to save rating.");

        }

    };

    return (

        <main className="min-h-screen bg-slate-950 text-white">

            {/* Hero Section */}

            <section
                className="
                bg-gradient-to-r
                from-slate-900
                via-slate-800
                to-slate-900
                border-b
                border-slate-700
            "
            >

                <div className="max-w-7xl mx-auto px-8 py-16">

                    <div className="grid md:grid-cols-3 gap-10">

                        {/* Poster */}

                        <div
                            className="
                            h-[450px]
                            rounded-2xl
                            bg-gradient-to-br
                            from-blue-600
                            to-purple-700
                            flex
                            items-center
                            justify-center
                            text-8xl
                            shadow-xl
                        "
                        >

                            🎬

                        </div>

                        {/* Movie Info */}

                        <div className="md:col-span-2">

                            <h1 className="text-5xl font-bold">

                                {movie.title}

                            </h1>

                            <div className="flex flex-wrap gap-4 mt-6">

                                <span
                                    className="
                                    bg-yellow-500/20
                                    text-yellow-400
                                    px-4
                                    py-2
                                    rounded-full
                                "
                                >
                                    ⭐ {movie.imdb_rating}
                                </span>

                                <span
                                    className="
                                    bg-blue-500/20
                                    text-blue-400
                                    px-4
                                    py-2
                                    rounded-full
                                "
                                >
                                    📅 {movie.release_year}
                                </span>

                            </div>

                            <div className="mt-8 space-y-4">

                                <p>

                                    <span className="font-semibold text-slate-300">

                                        Genre:

                                    </span>

                                    {" "}
                                    {movie.genre}

                                </p>

                                <p>

                                    <span className="font-semibold text-slate-300">

                                        Director:

                                    </span>

                                    {" "}
                                    {movie.director || "Unknown"}

                                </p>

                                <p>

                                    <span className="font-semibold text-slate-300">

                                        Cast:

                                    </span>

                                    {" "}
                                    {movie.actors || "Unknown"}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Description */}

            <section className="max-w-7xl mx-auto px-8 py-12">

                <div
                    className="
                    bg-slate-800
                    rounded-2xl
                    p-8
                    shadow-lg
                "
                >

                    <h2 className="text-3xl font-bold mb-6">

                        📖 Description

                    </h2>

                    <p
                        className="
                        text-slate-300
                        leading-8
                        text-lg
                    "
                    >

                        {movie.description}

                    </p>

                </div>

            </section>

            {/* Rating */}

            <section className="max-w-7xl mx-auto px-8 pb-12">

                <div
                    className="
                    bg-slate-800
                    rounded-2xl
                    p-8
                    shadow-lg
                "
                >

                    <h2 className="text-3xl font-bold mb-6">

                        ⭐ Rate This Movie

                    </h2>

                    {

                        user ? (

                            <RatingStars onRate={submitRating} />

                        ) : (

                            <div
                                className="
                                bg-red-500/10
                                border
                                border-red-500/20
                                text-red-400
                                rounded-xl
                                p-4
                            "
                            >

                                Please login to rate movies.

                            </div>

                        )

                    }

                </div>

            </section>

            {/* Recommendations */}

            {

                recommendations.length > 0 && (

                    <section className="max-w-7xl mx-auto px-8 pb-20">

                        <h2 className="text-3xl font-bold mb-8">

                            🎯 Similar Movies

                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {

                                recommendations.map((title, index) => (

                                    <div
                                        key={index}
                                        className="
                                        bg-slate-800
                                        rounded-xl
                                        p-5
                                        hover:scale-105
                                        transition
                                        shadow-lg
                                    "
                                    >

                                        <div
                                            className="
                                            h-40
                                            bg-gradient-to-br
                                            from-blue-600
                                            to-purple-700
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            text-4xl
                                            mb-4
                                        "
                                        >

                                            🎬

                                        </div>

                                        <h3 className="font-semibold">

                                            {title}

                                        </h3>

                                    </div>

                                ))

                            }

                        </div>

                    </section>

                )

            }

        </main>

    );

}