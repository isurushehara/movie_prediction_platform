"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth";
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

            <main className="min-h-screen bg-slate-950 text-white">

                <section className="max-w-5xl mx-auto px-8 py-16">

                    {/* Page Header */}

                    <div className="mb-10">

                        <h1 className="text-5xl font-extrabold">

                            👤 My Profile

                        </h1>

                        <p className="text-slate-400 mt-3">

                            Manage your account and view your information.

                        </p>

                    </div>

                    {/* Profile Card */}

                    <div
                        className="
                        bg-slate-800
                        rounded-3xl
                        p-8
                        shadow-xl
                        border
                        border-slate-700
                    "
                    >

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            {/* Avatar */}

                            <div
                                className="
                                w-32
                                h-32
                                rounded-full
                                bg-gradient-to-br
                                from-blue-500
                                to-purple-600
                                flex
                                items-center
                                justify-center
                                text-6xl
                                shadow-lg
                            "
                            >

                                👤

                            </div>

                            {/* User Info */}

                            <div className="flex-1">

                                <h2 className="text-3xl font-bold">

                                    {user.name}

                                </h2>

                                <p className="text-slate-400 mt-2">

                                    {user.sub}

                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Statistics */}

                    <div className="grid md:grid-cols-3 gap-6 mt-10">

                        <div
                            className="
                            bg-slate-800
                            rounded-2xl
                            p-6
                            shadow-lg
                            border
                            border-slate-700
                        "
                        >

                            <div className="text-4xl mb-3">

                                🎬

                            </div>

                            <h3 className="text-xl font-semibold">

                                Movie Lover

                            </h3>

                            <p className="text-slate-400 mt-2">

                                Discover new movies through AI recommendations.

                            </p>

                        </div>

                        <div
                            className="
                            bg-slate-800
                            rounded-2xl
                            p-6
                            shadow-lg
                            border
                            border-slate-700
                        "
                        >

                            <div className="text-4xl mb-3">

                                ⭐

                            </div>

                            <h3 className="text-xl font-semibold">

                                Ratings

                            </h3>

                            <p className="text-slate-400 mt-2">

                                Rate movies to improve recommendation quality.

                            </p>

                        </div>

                        <div
                            className="
                            bg-slate-800
                            rounded-2xl
                            p-6
                            shadow-lg
                            border
                            border-slate-700
                        "
                        >

                            <div className="text-4xl mb-3">

                                🎯

                            </div>

                            <h3 className="text-xl font-semibold">

                                Personalized AI

                            </h3>

                            <p className="text-slate-400 mt-2">

                                Recommendations generated just for you.

                            </p>

                        </div>

                    </div>

                </section>

            </main>

        </ProtectedRoute>

    );

}