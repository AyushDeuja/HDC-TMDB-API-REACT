import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_OPTIONS } from "../utils/constants";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchQuery) => {
    let data;

    if (searchQuery) {
      data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
    } else {
      data = await fetch(
        "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
        API_OPTIONS
      );
    }
    const json = await data.json();
    console.log(json.results);
    return json.results;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (searchQuery) => {
    //fetching trending movies
    let data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=b0a3f6e0c5b35d0b4a8d7c0d6cd334a6&language=en-US&page=1",
      API_OPTIONS
    );
    if (searchQuery) {
      data = await fetch(
        //fetching movies based on search query
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
    } else {
      data = await fetch(
        //fetching top rated movies
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
    }
    const json = await data.json();
    return json.results;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movieCards: [],
    trendingMovieCards: [],
    searchQuery: "",
    favouriteMovies: JSON.parse(localStorage.getItem("favouriteMovies")) || [],
  },
  reducers: {
    setTrendingMovies: (state, action) => {
      state.trendingMovieCards = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addFavouriteMovie: (state, action) => {
      state.favouriteMovies.push(action.payload);
    },
    removeFavouriteMovie: (state, action) => {
      state.favouriteMovies = state.favouriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieCards = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchTrendingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trendingMovieCards = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  setSearchQuery,
  setTrendingMovies,
  addFavouriteMovie,
  removeFavouriteMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
