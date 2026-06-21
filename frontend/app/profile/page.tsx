"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/auth";

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

        return (

            <main className="max-w-3xl mx-auto p-10">

                <h1 className="text-2xl">

                    Please login first

                </h1>

            </main>

        );

    }

    return (

        <main className="max-w-3xl mx-auto p-10">

            <h1 className="text-4xl font-bold">

                Profile

            </h1>

            <div className="mt-6 space-y-2">

                <p>
                    <strong>Name:</strong> {user.name}
                </p>

                <p>
                    <strong>Email:</strong> {user.sub}
                </p>

                <p>
                    <strong>User ID:</strong> {user.user_id}
                </p>

            </div>

        </main>

    );

}