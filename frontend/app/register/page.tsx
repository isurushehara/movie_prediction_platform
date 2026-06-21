"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function RegisterPage() {

    const router = useRouter();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const register = async () => {

        try {

            await api.post("/auth/register", {

                name,

                email,

                password,

            });

            alert("Registration successful!");

            router.push("/login");

        } catch {

            alert("Registration failed");

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 px-4">

            <div className="w-full max-w-md bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700 p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white">

                        Create Account 🚀

                    </h1>

                    <p className="text-slate-400 mt-2">

                        Join MovieAI and get personalized recommendations

                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button
                    onClick={register}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white py-3 rounded-lg font-semibold"
                >

                    Create Account

                </button>

                <div className="mt-6 text-center">

                    <p className="text-slate-400">

                        Already have an account?

                    </p>

                    <a
                        href="/login"
                        className="text-blue-400 hover:text-blue-300 font-medium"
                    >

                        Login Here

                    </a>

                </div>

            </div>

        </div>

    );

}