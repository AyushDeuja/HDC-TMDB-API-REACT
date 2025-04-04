import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movieCards);
  const searchQuery = useSelector((state) => state.movies.searchQuery);

  useEffect(() => {
    // searchMovie();
    dispatch(fetchMovies(searchQuery));
  }, [searchQuery]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">All MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {movies.length > 0 ? (
          movies?.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
            />
          ))
        ) : (
          <h2 className="text-5xl font-bold text-center text-red-500">
            No movies found
          </h2>
        )}
      </div>
    </>
  );
};

export default Movies;
