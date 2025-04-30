import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import { fetchMovies, setCurrentPage } from "../redux/movieSlice";

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movieCards);
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const favouriteMovies = useSelector((state) => state.movies.favouriteMovies);
  const currentPage = useSelector((state) => state.movies.currentPage);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const status = useSelector((state) => state.movies.status);

  useEffect(() => {
    dispatch(fetchMovies({ searchQuery, page: currentPage }));
  }, [searchQuery, currentPage]);

  useEffect(() => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const renderPageButton = (page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`px-4 py-2 rounded ${
        currentPage === page ? "bg-green-500 text-white" : "bg-gray-200"
      }`}
    >
      {page}
    </button>
  );

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">All MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {status === "loading" ? (
          <div className="text-center">
            <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <h2 className="text-5xl font-bold text-center text-red-500">
            No movies found
          </h2>
        )}
      </div>

      {/* Pagination starts here */}
      <div className="w-full py-6 flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {renderPageButton(1)}

        {currentPage > 3 && <span className="px-2">...</span>}

        {[currentPage - 1, currentPage, currentPage + 1].map((page) =>
          page > 1 && page < totalPages ? renderPageButton(page) : null
        )}

        {currentPage < totalPages - 2 && <span className="px-2">...</span>}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Movies;
