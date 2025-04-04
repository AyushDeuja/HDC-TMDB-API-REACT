import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movieCards: [],
    trendingMovieCards: [],
    searchQuery: "", //  Add searchQuery to the state
  },
  reducers: {
    setMovies: (state, action) => {
      state.movieCards = action.payload;
    },
    setTrendingMovies: (state, action) => {
      state.trendingMovieCards = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; //  Store search term
    },
  },
});

export const { setMovies, setSearchQuery, setTrendingMovies } =
  movieSlice.actions;
export default movieSlice.reducer;
