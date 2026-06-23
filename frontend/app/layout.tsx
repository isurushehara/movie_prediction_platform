import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {

    title: "Movie Recommendation System",

    description: "AI Powered Movie Recommendation System",

};

export default function RootLayout({

    children,

}: Readonly<{

    children: React.ReactNode;

}>) {

    return (

        <html lang="en">

            <body>

                <AuthProvider>

                    <Navbar />

                    <main className="flex-1">

                        {children}

                    </main>

                    <Footer />

                </AuthProvider>

            </body>

        </html>

    );

}