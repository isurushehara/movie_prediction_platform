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

    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        🎬 Movie Recommendation System

      </h1>

      <SearchBar

        value={search}

        onChange={setSearch}

      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {

          filteredMovies.map((movie) => (

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