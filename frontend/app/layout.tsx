import "./globals.css";

import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

            <body className="bg-gray-100 min-h-screen flex flex-col">

                <Navbar />

                <main className="flex-1">

                    {children}

                </main>

                <Footer />

            </body>

        </html>

    );

}