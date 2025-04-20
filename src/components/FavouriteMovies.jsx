import { useSelector } from "react-redux";
import Card from "./Card";
import { useAuth } from "../auth/AuthContext";

const FavouriteMovies = () => {
  const favouriteMovies = useSelector((state) => state.movies.favouriteMovies);
  const { logout } = useAuth();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-center">Favourite Movies</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
        >
          Logout
        </button>
      </div>

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
