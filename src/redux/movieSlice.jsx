import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_OPTIONS } from "../utils/constants";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ searchQuery, page = 1 }) => {
    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    return { results: data.results, totalPages: data.total_pages };
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrendingMovies",
  async (searchQuery) => {
    let data;
    if (searchQuery) {
      data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
    } else {
      data = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1",
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
    currentPage: 1,
    totalPages: 1,
    favouriteMovies: JSON.parse(localStorage.getItem("favouriteMovies")) || [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1 on new search
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
      // Fetching Movies (Search or Popular)
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movieCards = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetching Trending Movies
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
  setCurrentPage,
  addFavouriteMovie,
  removeFavouriteMovie,
} = movieSlice.actions;

export default movieSlice.reducer;
