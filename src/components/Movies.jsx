import React, { useEffect, useState } from "react";
import Card from "./Card";
import useMovie from "../hooks/useMovie";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const Movies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const movies = useSelector((state) => state.movies.movieCards);
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  // Fetch movies initially using the useMovie hook
  useMovie();

  const searchMovie = async () => {
    if (!searchQuery) return; // Only search if there is a search query

    setLoading(true);
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(setMovies(json.results));
    setLoading(false);
  };

  useEffect(() => {
    searchMovie();
  }, [searchQuery]);

  if (loading) {
    return (
      <h1 className="text-5xl font-bold text-center text-red-500">
        Loading...
      </h1>
    ); // Display loading message during fetch
  }

  if (!movies || movies.length === 0) {
    return (
      <h1 className="text-5xl font-bold text-center text-red-500">
        No movies available
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">All MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            title={movie.original_title}
            rating={movie.vote_average}
            releaseDate={movie.release_date}
          />
        ))}
      </div>
    </>
  );
};

export default Movies;
