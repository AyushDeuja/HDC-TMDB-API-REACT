import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null); // Initialize as null for better conditional rendering
  const [loading, setLoading] = useState(true); // State for loader

  const getDetail = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      setMovieDetail(json);
      setLoading(false); // Stop loader after data is fetched
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setLoading(false); // Stop loader even if there's an error
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]); // Refetch when the id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
          <p className="text-lg font-medium mt-2 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!movieDetail || !movieDetail.poster_path) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium text-red-500">
          Movie details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="max-w-md w-full rounded-lg shadow-lg bg-white text-gray-900">
        <img
          className="w-full h-96 object-cover rounded-t-lg"
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={movieDetail.title}
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center mb-4">
            {movieDetail.title}
          </h1>
          <p className="text-sm text-gray-700 leading-relaxed">
            {movieDetail.overview}
          </p>
          <div className="mt-4">
            <p className="text-sm font-medium">
              <span className="font-bold">Release Date:</span>{" "}
              {movieDetail.release_date}
            </p>
            <p className="text-sm font-medium">
              <span className="font-bold">Rating:</span>{" "}
              {movieDetail.vote_average} ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
