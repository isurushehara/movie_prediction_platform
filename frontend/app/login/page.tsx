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

            localStorage.setItem(

                "token",

                response.data.access_token

            );

            alert("Login successful!");

            router.push("/");

        } catch {

            alert("Invalid email or password");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-4">

            <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">

                        Welcome Back 👋

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Login to continue discovering movies

                    </p>

                </div>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={login}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-lg font-semibold"
                >

                    Login

                </button>

                <div className="mt-6 text-center">

                    <p className="text-slate-400">

                        Don't have an account?

                    </p>

                    <a
                        href="/register"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >

                        Create Account

                    </a>

                </div>

            </div>

        </div>

    );

}