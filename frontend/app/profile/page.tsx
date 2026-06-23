"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/features/auth/services/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

interface User {
    sub: string;
    user_id: number;
    name: string;
}

export default function ProfilePage() {
    const [mounted, setMounted] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setMounted(true);

        const currentUser = getCurrentUser();

        setUser(currentUser);
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-stone-50 text-stone-900 relative overflow-hidden">
                {/* Ambient background glow */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute top-[-10%] left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-200/40 blur-[120px]" />
                    <div className="absolute top-[10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-amber-200/40 blur-[120px]" />
                </div>

                <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
                    {/* Page Header */}
                    <div className="mb-10">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                            👤 My Profile
                        </h1>

                        <p className="text-stone-500 mt-3">
                            Manage your account and view your information.
                        </p>
                    </div>

                    {/* Profile Card */}
                    <div
                        className="
              bg-white/60
              backdrop-blur-xl backdrop-saturate-150
              border border-white/60
              rounded-3xl
              p-8
              shadow-xl shadow-stone-200/50
            "
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Avatar */}
                            <div
                                className="
                  w-28 h-28
                  rounded-full
                  bg-gradient-to-br
                  from-emerald-400
                  via-teal-400
                  to-amber-300
                  flex
                  items-center
                  justify-center
                  text-5xl
                  shadow-md
                  ring-4 ring-white/70
                "
                            >
                                👤
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-stone-900">
                                    {user.name}
                                </h2>

                                <p className="text-stone-500 mt-2">{user.sub}</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-3 gap-6 mt-10">
                        <div
                            className="
                bg-white
                border border-stone-200
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-md hover:-translate-y-0.5
                transition-all
                duration-300
              "
                        >
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl mb-4">
                                🎬
                            </div>

                            <h3 className="text-lg font-semibold text-stone-900">
                                Movie Lover
                            </h3>

                            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
                                Discover new movies through AI recommendations.
                            </p>
                        </div>

                        <div
                            className="
                bg-white
                border border-stone-200
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-md hover:-translate-y-0.5
                transition-all
                duration-300
              "
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl mb-4">
                                ⭐
                            </div>

                            <h3 className="text-lg font-semibold text-stone-900">
                                Ratings
                            </h3>

                            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
                                Rate movies to improve recommendation quality.
                            </p>
                        </div>

                        <div
                            className="
                bg-white
                border border-stone-200
                rounded-2xl
                p-6
                shadow-sm
                hover:shadow-md hover:-translate-y-0.5
                transition-all
                duration-300
              "
                        >
                            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl mb-4">
                                🎯
                            </div>

                            <h3 className="text-lg font-semibold text-stone-900">
                                Personalized AI
                            </h3>

                            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
                                Recommendations generated just for you.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}