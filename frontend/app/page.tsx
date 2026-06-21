"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

import { Movie } from "@/types/movie";
import RatingStars from "@/components/RatingStars";

export default function Home() {

  const [movies, setMovies] = useState<Movie[]>([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    api.get("/movies")

      .then((response) => {

        setMovies(response.data);

      })

      .catch((error) => {

        console.log(error);

      });

  }, []);



  const filteredMovies = movies.filter((movie) =>

    movie.title.toLowerCase().includes(

      search.toLowerCase()

    )

  );

  return (

    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-8 pt-16 pb-20">

        <div className="text-center">

          <h1 className="text-6xl font-extrabold mb-6">

            🎬 Discover Your Next
            <span className="text-blue-400">
              {" "}Favorite Movie
            </span>

          </h1>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto">

            AI-powered movie recommendations
            based on your preferences and ratings.

          </p>

        </div>

        <div className="max-w-2xl mx-auto mt-10">

          <SearchBar
            value={search}
            onChange={setSearch}
          />

        </div>

      </section>

      {/* Movies Section */}

      <section className="max-w-7xl mx-auto px-8 pb-20">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">

            🎥 Browse Movies

          </h2>

          <span className="text-slate-400">

            {filteredMovies.length} Movies

          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {

            filteredMovies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))

          }

        </div>

      </section>

    </main>

  );

}