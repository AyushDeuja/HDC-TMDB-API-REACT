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

  useEffect(() => {
    dispatch(fetchTrendingMovies(searchQuery));
  }, [searchQuery]);

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">TRENDING MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {trendingMovieCards.length > 0 ? (
          trendingMovieCards.map((movie) => (
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

export default Trending;
