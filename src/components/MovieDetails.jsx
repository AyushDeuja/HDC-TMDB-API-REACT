import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState([]);

  const getDetail = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    setMovieDetail(json);
    console.log(json);
  };

  useEffect(() => {
    getDetail();
  }, [id]); // Add 'id' to the dependency array to refetch when the id changes

  if (!movieDetail.poster_path) {
    return <div>LOADING....</div>;
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-xs rounded-lg shadow-lg bg-gray-900 text-white">
          <img
            className="w-full h-96 object-cover rounded-t-lg"
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <h2 className="text-xl font-semibold text-center p-4">
            {movieDetail.overview}
          </h2>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
