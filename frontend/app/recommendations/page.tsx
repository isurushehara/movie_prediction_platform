"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { getCurrentUser } from "@/features/auth/services/auth";
import { Recommendation } from "@/features/recommendations/types/recommendation";
import { RecommendationService } from "@/features/recommendations/services/recommendation";
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

        RecommendationService
            .getPersonalizedRecommendations(user.user_id)
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
            <main className="min-h-screen bg-stone-50 flex items-center justify-center relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-emerald-200/40 blur-[120px]" />
                </div>

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

                    <p className="text-stone-500 mt-6">Loading recommendations...</p>
                </div>
            </main>
        );
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-stone-50 text-stone-900 relative overflow-hidden">
                {/* Ambient background glow */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald-200/40 blur-[120px]" />
                    <div className="absolute top-[15%] right-[-10%] h-[300px] w-[300px] rounded-full bg-amber-200/40 blur-[100px]" />
                </div>

                {/* Header */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
                    <div className="text-center">
                        <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-sm text-stone-600 mb-6 backdrop-blur shadow-sm">
                            🎯 Just for you
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-stone-900">
                            Recommended For{" "}
                            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 bg-clip-text text-transparent">
                                You
                            </span>
                        </h1>

                        <p className="text-stone-500 mt-4 text-lg max-w-2xl mx-auto">
                            Personalized recommendations based on your ratings and
                            preferences.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
                    {recommendations.length === 0 ? (
                        <div
                            className="
                bg-white/60
                backdrop-blur-xl backdrop-saturate-150
                border border-white/60
                rounded-2xl
                p-12
                text-center
                shadow-sm
              "
                        >
                            <div className="text-6xl mb-4">🎬</div>

                            <h2 className="text-2xl font-bold text-stone-900">
                                No Recommendations Yet
                            </h2>

                            <p className="text-stone-500 mt-3">
                                Rate a few movies to unlock personalized recommendations.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {recommendations.map((movie) => (
                                <div
                                    key={movie.movie_id}
                                    className="
                    group
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
                      h-48
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
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.2),transparent_50%)]" />

                                        <span className="text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                                            🎬
                                        </span>
                                    </div>

                                    {/* Movie Info */}
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-stone-900 mb-4 line-clamp-1">
                                            {movie.title}
                                        </h2>

                                        <div
                                            className="
                        inline-flex
                        items-center
                        gap-1.5
                        px-4
                        py-2
                        rounded-full
                        bg-emerald-50
                        border border-emerald-200
                        text-emerald-700
                        font-semibold
                        text-sm
                      "
                                        >
                                            🎯 Match Score: {movie.score}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </ProtectedRoute>
    );
}