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

        <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">

            <h1 className="text-3xl font-bold mb-6">

                Register

            </h1>

            <input

                className="border p-3 w-full mb-4 rounded"

                placeholder="Name"

                value={name}

                onChange={(e) => setName(e.target.value)}

            />

            <input

                className="border p-3 w-full mb-4 rounded"

                placeholder="Email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

            />

            <input

                type="password"

                className="border p-3 w-full mb-4 rounded"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

            />

            <button

                onClick={register}

                className="bg-green-600 text-white w-full p-3 rounded"

            >

                Register

            </button>

        </div>

    );

}