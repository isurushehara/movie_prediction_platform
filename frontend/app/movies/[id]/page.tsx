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

        <main className="max-w-5xl mx-auto p-10">

            <h1 className="text-5xl font-bold">

                {movie.title}

            </h1>

            <div className="mt-6 space-y-3">

                <p>

                    ⭐ {movie.imdb_rating}

                </p>

                <p>

                    📅 {movie.release_year}

                </p>

                <p>

                    🎭 {movie.genre}

                </p>

                <p>

                    👨‍🎬 {movie.director}

                </p>

                <p>

                    🎬 {movie.actors}

                </p>

            </div>

            <div className="mt-8">

                <h2 className="text-2xl font-bold">

                    Description

                </h2>

                <p className="mt-3">

                    {movie.description}

                </p>

            </div>

            <div className="mt-8">

                <h2 className="text-2xl font-bold">

                    Rate this Movie

                </h2>

                {
                    user ? (

                        <RatingStars onRate={submitRating} />

                    ) : (

                        <p className="text-red-500">

                            Please login to rate movies.

                        </p>

                    )
                }

            </div>

        </main>

    );

}