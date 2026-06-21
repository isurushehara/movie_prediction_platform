"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.access_token);

            alert("Login successful!");

            router.push("/");
        } catch {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-[-10%] left-[10%] h-[400px] w-[400px] rounded-full bg-emerald-200/50 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[10%] h-[400px] w-[400px] rounded-full bg-amber-200/40 blur-[120px]" />
            </div>

            <div
                className="
          w-full max-w-md
          bg-white/60
          backdrop-blur-xl backdrop-saturate-150
          rounded-2xl
          shadow-xl shadow-stone-200/60
          border border-white/60
          p-8
        "
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-stone-900">
                        Welcome Back 👋
                    </h1>
                    <p className="text-stone-500 mt-2">
                        Login to continue discovering movies
                    </p>
                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
            w-full
            bg-white/70
            text-stone-900
            placeholder-stone-400
            border border-stone-200
            rounded-lg
            px-4 py-3 mb-4
            shadow-sm
            transition-colors
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500
          "
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
            w-full
            bg-white/70
            text-stone-900
            placeholder-stone-400
            border border-stone-200
            rounded-lg
            px-4 py-3 mb-6
            shadow-sm
            transition-colors
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500
          "
                />

                <button
                    onClick={login}
                    className="
            w-full
            bg-emerald-600
            hover:bg-emerald-500
            active:bg-emerald-700
            transition-colors
            text-white
            py-3
            rounded-lg
            font-semibold
            shadow-sm
          "
                >
                    Login
                </button>

                <div className="mt-6 text-center">
                    <p className="text-stone-500 text-sm">Don&apos;t have an account?</p>


                    <a href="/register"
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                        Create Account
                    </a>
                </div>
            </div>
        </div >
    );
}