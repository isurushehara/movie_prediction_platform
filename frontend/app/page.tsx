"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

import { Movie } from "@/features/movies/types/movie";
import { MovieService } from "@/features/movies/services/movie";
import RatingStars from "@/components/RatingStars";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MovieService
      .getMovies()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-amber-200/40 blur-[100px]" />
        <div className="absolute top-[30%] left-[-10%] h-[300px] w-[300px] rounded-full bg-rose-200/30 blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-16 sm:pb-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/70 px-4 py-1.5 text-sm text-stone-600 mb-6 backdrop-blur shadow-sm">
            🍿 Powered by AI recommendations
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-stone-900">
            Discover Your Next
            <span className="block sm:inline bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 bg-clip-text text-transparent">
              {" "}
              Favorite Movie
            </span>
          </h1>

          <p className="text-stone-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            AI-powered movie recommendations based on your preferences and
            ratings.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-10">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </section>

      {/* Movies Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-20">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8 border-b border-stone-200 pb-5">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 text-stone-900">
            <span>🎥</span> Browse Movies
          </h2>

          <span className="text-sm font-medium text-stone-500 bg-white border border-stone-200 px-3 py-1 rounded-full shadow-sm">
            {filteredMovies.length} {filteredMovies.length === 1 ? "Movie" : "Movies"}
          </span>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl bg-white border border-stone-200 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredMovies.length === 0 && (
          <div className="text-center py-24 border border-dashed border-stone-300 rounded-2xl bg-white/50">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-stone-700 text-lg font-medium">No movies found</p>
            <p className="text-stone-500 text-sm mt-1">
              Try adjusting your search and try again.
            </p>
          </div>
        )}

        {/* Movie grid */}
        {!loading && filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}