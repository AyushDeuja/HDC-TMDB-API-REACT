import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";
import Card from "./Card";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc",
      API_OPTIONS
    );
    const json = await data.json();
    setMovies(json.results);
    console.log(json);
  };
  useEffect(() => {
    getMovies();
  }, []);
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
