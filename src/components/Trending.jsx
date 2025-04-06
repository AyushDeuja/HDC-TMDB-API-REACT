import { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingMovies } from "../redux/movieSlice";
const Trending = () => {
  const dispatch = useDispatch();
  const trendingMovieCards = useSelector(
    (state) => state.movies.trendingMovieCards
  );
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    dispatch(fetchTrendingMovies(searchQuery));
  }, [searchQuery]);
  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleFavourite = (movie) => {
    let updatedFavourites;
    const isMovieFavourite = favourites.some((fav) => fav.id === movie.id);

    if (isMovieFavourite) {
      updatedFavourites = favourites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavourites = [...favourites, movie];
    }

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">TRENDING MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {trendingMovieCards.length > 0 ? (
          trendingMovieCards.map((movie) => (
            <Card
              isMovieFavourite={favourites}
              addFavourite={() => handleFavourite(movie)}
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

export default Trending;
