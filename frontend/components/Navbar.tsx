"use client";

import Link from "next/link";

const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

};

export default function Navbar() {

    return (

        <nav className="bg-blue-600 text-white shadow">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link href="/">

                    <h1 className="text-2xl font-bold cursor-pointer">

                        🎬 Movie Recommendation

                    </h1>

                </Link>

                <div className="flex gap-6">

                    <Link href="/">Home</Link>

                    <Link href="/recommendations">
                        Recommendations
                    </Link>

                    <Link href="/register">
                        Register
                    </Link>

                    <Link href="/login">
                        Login
                    </Link>

                    <Link href="/profile">
                        Profile
                    </Link>

                    <button onClick={logout}>

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}