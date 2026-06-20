"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import api from "@/services/api";
import { Movie } from "@/types/movie";
import SearchBar from "@/components/SearchBar";

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

  return (

    <main className="p-10">

      <h1 className="text-4xl font-bold mb-8">

        Movie Recommendation System

      </h1>
      <SearchBar

        value={search}

        onChange={setSearch}

      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {

          movies.map((movie) => (

            <MovieCard

              key={movie.id}

              movie={movie}

            />

          ))

        }

      </div>

    </main>

  );

}