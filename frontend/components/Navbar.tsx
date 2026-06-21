"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {

    const { isLoggedIn, logout } = useAuth();

    const pathname = usePathname();

    const linkStyle = (path: string) =>
        `transition font-medium ${pathname === path
            ? "text-blue-400"
            : "text-slate-300 hover:text-blue-400"
        }`;

    return (

        <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-lg">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl font-bold text-blue-400"
                >
                    <span className="text-3xl">🎬</span>
                    <span>MovieAI</span>
                </Link>

                {/* Navigation */}

                <div className="flex items-center gap-6">

                    <Link
                        href="/"
                        className={linkStyle("/")}
                    >
                        Home
                    </Link>

                    {isLoggedIn && (

                        <Link
                            href="/recommendations"
                            className={linkStyle("/recommendations")}
                        >
                            Recommendations
                        </Link>

                    )}

                    {!isLoggedIn ? (

                        <>
                            <Link
                                href="/login"
                                className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white font-medium"
                            >
                                Login
                            </Link>

                            {/* <Link
                                href="/register"
                                className="border border-slate-600 hover:border-blue-400 hover:text-blue-400 transition px-4 py-2 rounded-lg text-slate-300"
                            >
                                Register
                            </Link> */}
                        </>

                    ) : (

                        <>
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition"
                            >
                                👤 Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg text-white font-medium"
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>

            </div>

        </nav>

    );

}