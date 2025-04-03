import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovie = () => {
  const dispatch = useDispatch();
  const getMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(setMovies(json.results));
    console.log(json);
  };
  useEffect(() => {
    getMovies();
  }, []);

  return <div></div>;
};

export default useMovie;
