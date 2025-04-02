import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import Card from "./Card";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = React.useState([]);
  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    setTrendingMovies(json.results);
    console.log(json);
  };
  useEffect(() => {
    getTrending();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">TRENDING MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {trendingMovies.map((movie) => (
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

export default Trending;
