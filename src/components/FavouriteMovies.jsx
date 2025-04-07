import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const FavouriteMovies = () => {
  const favouriteMovies = useSelector((state) => state.movies.favouriteMovies);

  useEffect(() => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center p-2">Favourite Movies</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <h2 className="text-5xl font-bold text-center text-red-500">
            No favourite movies found
          </h2>
        )}
      </div>
    </div>
  );
};

export default FavouriteMovies;
