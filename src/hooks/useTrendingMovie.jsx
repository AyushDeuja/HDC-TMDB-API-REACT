import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTrendingMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovie = () => {
  const dispatch = useDispatch();
  const getTrending = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(setTrendingMovies(json.results));
    console.log(json);
  };
  useEffect(() => {
    getTrending();
  }, []);
};

export default useTrendingMovie;
