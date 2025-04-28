import { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingMovies } from "../redux/movieSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const trendingMovieCards = useSelector(
    (state) => state.movies.trendingMovieCards
  );
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const favouriteMovies = useSelector((state) => state.movies.favouriteMovies);
  const status = useSelector((state) => state.movies.status); // Fetch the status from Redux state

  useEffect(() => {
    dispatch(fetchTrendingMovies(searchQuery));
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">TRENDING MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {status === "loading" ? (
          <div className="text-center">
            <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-lg text-center font-medium mt-2">
              Loading trending movies...
            </p>
          </div>
        ) : trendingMovieCards.length > 0 ? (
          trendingMovieCards.map((movie) => (
            <Card key={movie.id} movie={movie} />
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
