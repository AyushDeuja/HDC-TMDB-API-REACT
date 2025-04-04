import React from "react";
import { IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router";

const Card = ({
  posterPath,
  title,
  rating,
  releaseDate,
  id,
  addFavourite,
  isMovieFavourite,
}) => {
  const isFav = isMovieFavourite.some((fav) => fav.id === id);
  return (
    <div className="w-60 p-2 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
      <img
        src={IMG_CDN_URL + posterPath}
        alt="MovieCard"
        className="rounded-t-lg"
      />
      <div className="p-2">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-gray-600">{rating}⭐</p>
        <p className="text-gray-500">{releaseDate}</p>
        <button className="px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-200 transition duration-300">
          <Link to={`/movieDetails/${id}`}>Details</Link>
        </button>
        <button
          onClick={addFavourite}
          className="text-2xl transition-transform transform hover:scale-125"
        >
          {isFav ? "💖" : "❤️"}
        </button>
      </div>
    </div>
  );
};

export default Card;
