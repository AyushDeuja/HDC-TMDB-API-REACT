import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movieCards: null,
    searchQuery: "", // ✅ Add searchQuery to the state
  },
  reducers: {
    setMovies: (state, action) => {
      state.movieCards = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // ✅ Store search term
    },
  },
});

export const { setMovies, setSearchQuery } = movieSlice.actions;
export default movieSlice.reducer;
