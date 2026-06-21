"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";
import { getCurrentUser } from "@/services/auth";

import { Recommendation } from "@/types/recommendation";

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

            <main className="p-10">

                Loading recommendations...

            </main>

        );

    }

    const user = getCurrentUser();

    if (!user) {

        return (

            <main className="p-10">

                <h1 className="text-2xl">

                    Please login first

                </h1>

            </main>

        );

    }

    return (

        <main className="max-w-6xl mx-auto p-10">

            <h1 className="text-4xl font-bold mb-8">

                🎯 Recommended For You

            </h1>

            {

                recommendations.length === 0 ? (

                    <p>

                        Rate a few movies first to get recommendations.

                    </p>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {

                            recommendations.map((movie) => (

                                <div
                                    key={movie.movie_id}
                                    className="bg-white rounded-lg shadow p-5"
                                >

                                    <h2 className="text-xl font-bold">

                                        {movie.title}

                                    </h2>

                                    <p className="mt-2 text-green-600">

                                        Match Score: {movie.score}

                                    </p>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </main>

    );

}