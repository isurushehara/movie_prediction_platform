"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    const pathname = usePathname();

    const linkStyle = (path: string) =>
        `transition font-medium text-sm ${pathname === path
            ? "text-emerald-700"
            : "text-stone-600 hover:text-emerald-700"
        }`;

    return (
        <div className="sticky top-4 z-50 px-4">
            <nav
                className="
          max-w-7xl mx-auto
          bg-green/60
          backdrop-blur-xl backdrop-saturate-150
          border border-white/60
          shadow-lg shadow-stone-200/50
          rounded-2xl
        "
            >
                <div className="px-6 py-3.5 flex justify-between items-center">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-stone-900"
                    >
                        <span className="text-2xl">🎬</span>
                        <span>
                            Movie
                            <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                                AI
                            </span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-5">
                        <Link href="/" className={linkStyle("/")}>
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
                            <Link
                                href="/login"
                                className="
                  bg-emerald-600/90
                  hover:bg-emerald-500
                  active:bg-emerald-700
                  backdrop-blur-sm
                  transition-colors
                  px-4 py-2
                  rounded-xl
                  text-white
                  text-sm
                  font-medium
                  shadow-sm shadow-emerald-900/10
                "
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-1.5 text-stone-600 hover:text-emerald-700 transition text-sm font-medium"
                                >
                                    👤 Profile
                                </Link>

                                <button
                                    onClick={logout}
                                    className="
                    bg-rose-500/90
                    hover:bg-rose-500
                    active:bg-rose-600
                    backdrop-blur-sm
                    transition-colors
                    px-4 py-2
                    rounded-xl
                    text-white
                    text-sm
                    font-medium
                    shadow-sm shadow-rose-900/10
                  "
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}