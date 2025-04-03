import Card from "./Card";
import useMovie from "../hooks/useMovie";
import { useSelector } from "react-redux";

const Movies = () => {
  useMovie();
  const movies = useSelector((state) => state.movies);
  const searchQuery = useSelector((state) => state.movies.searchQuery); // Get search query from Redux

  if (!movies || !movies.movieCards) {
    return <h1>Loading movies...</h1>;
  }

  // Filter movies based on search query
  const filteredMovies = movies.movieCards.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">All MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
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
          <h2 className="text-xl font-semibold text-center text-red-500">
            No movies found
          </h2>
        )}
      </div>
    </>
  );
};

export default Movies;
