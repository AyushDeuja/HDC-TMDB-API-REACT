import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteMovie, removeFavouriteMovie } from "../redux/movieSlice";
import { toast } from "react-toastify";

const Card = ({ movie }) => {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector((state) => state.movies.favouriteMovies);
  const isFav = favouriteMovies.some((fav) => fav.id === movie.id);

  const handleFavourite = () => {
    if (isFav) {
      dispatch(removeFavouriteMovie(movie));
      toast.error("Removed from favourites!", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { marginTop: "75px" },
      });
    } else {
      dispatch(addFavouriteMovie(movie));
      toast.success("Added to favourites!", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: { marginTop: "75px" },
      });
    }
  };
  return (
    <div className="w-60 p-2 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        src={IMG_CDN_URL + movie.poster_path}
        alt="MovieCard"
        className="rounded-t-lg "
      />
      <div className="p-2">
        <p className="font-bold text-lg">{movie.original_title}</p>
        <p className="text-gray-600">{movie.vote_average}⭐</p>
        <p className="text-gray-400">{movie.release_date}</p>
        <div className="flex justify-between items-center mt-2">
          <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-200 transition duration-300">
            <Link to={`/movieDetails/${movie.id}`}>Details</Link>
          </button>
          <button
            onClick={handleFavourite}
            className="text-2xl transition-transform transform hover:scale-125"
          >
            {isFav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
