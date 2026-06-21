"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { getCurrentUser } from "@/services/auth";
import { Recommendation } from "@/types/recommendation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function RecommendationsPage() {

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const user = getCurrentUser();

        if (!user) {

            setLoading(false);

            return;

        }

        api.get(`/personalized/${user.user_id}`)

            .then((response) => {

                setRecommendations(response.data);

            })

            .catch(console.error)

            .finally(() => {

                setLoading(false);

            });

    }, []);

    if (loading) {

        return (

            <main className="min-h-screen bg-slate-950 flex items-center justify-center">

                <div className="text-center">

                    <div
                        className="
                        animate-spin
                        rounded-full
                        h-16
                        w-16
                        border-b-4
                        border-blue-500
                        mx-auto
                    "
                    />

                    <p className="text-slate-400 mt-6">

                        Loading recommendations...

                    </p>

                </div>

            </main>

        );

    }


    return (

        <ProtectedRoute>

            <main className="min-h-screen bg-slate-950 text-white">

                {/* Header */}

                <section className="max-w-7xl mx-auto px-8 pt-16 pb-10">

                    <div className="text-center">

                        <h1 className="text-5xl font-extrabold">

                            🎯 Recommended For You

                        </h1>

                        <p className="text-slate-400 mt-4 text-lg">

                            Personalized recommendations based on your ratings and preferences.

                        </p>

                    </div>

                </section>

                {/* Content */}

                <section className="max-w-7xl mx-auto px-8 pb-20">

                    {

                        recommendations.length === 0 ? (

                            <div
                                className="
                                bg-slate-800
                                rounded-2xl
                                p-10
                                text-center
                                shadow-lg
                            "
                            >

                                <div className="text-6xl mb-4">

                                    🎬

                                </div>

                                <h2 className="text-2xl font-bold">

                                    No Recommendations Yet

                                </h2>

                                <p className="text-slate-400 mt-4">

                                    Rate a few movies to unlock personalized recommendations.

                                </p>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {

                                    recommendations.map((movie) => (

                                        <div
                                            key={movie.movie_id}
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
                                                h-52
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

                                            {/* Movie Info */}

                                            <div className="p-6">

                                                <h2
                                                    className="
                                                    text-xl
                                                    font-bold
                                                    text-white
                                                    mb-4
                                                "
                                                >

                                                    {movie.title}

                                                </h2>

                                                <div
                                                    className="
                                                    inline-flex
                                                    items-center
                                                    px-4
                                                    py-2
                                                    rounded-full
                                                    bg-green-500/20
                                                    text-green-400
                                                    font-semibold
                                                "
                                                >

                                                    🎯 Match Score:
                                                    {" "}
                                                    {movie.score}

                                                </div>

                                            </div>

                                        </div>

                                    ))

                                }

                            </div>

                        )

                    }

                </section>

            </main>

        </ProtectedRoute>

    );

}