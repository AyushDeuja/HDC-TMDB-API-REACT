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

  return (
    <>
      <h1 className="text-3xl font-bold text-center p-2">All MOVIES</h1>
      <div className="flex flex-wrap gap-10 justify-center mt-5">
        {status === "loading" ? (
          <div className="text-center">
            <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-lg text-center font-medium mt-2">
              Loading movies...
            </p>
          </div>
        ) : movies.length > 0 ? (
          movies.map((movie) => <Card key={movie.id} movie={movie} />)
        ) : (
          <h2 className="text-5xl font-bold text-center text-red-500">
            No movies found
          </h2>
        )}
      </div>

      {/* pagination starts here */}
      <div className="w-full py-6 flex justify-center items-center gap-2 mt-10 flex-wrap">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Always show first page */}
        <button
          onClick={() => handlePageChange(1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          1
        </button>

        {/* Show "..." if currentPage is far from start */}
        {currentPage > 3 && <span className="px-2">...</span>}

        {/* Show currentPage - 1, currentPage, currentPage + 1 if in valid range */}
        {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i).map(
          (page) => {
            if (page > 1 && page < totalPages) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            }
            return null;
          }
        )}

        {/* Always show ending "..." */}
        {currentPage < totalPages - 2 && <span className="px-2">...</span>}

        {/* Next button */}
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
