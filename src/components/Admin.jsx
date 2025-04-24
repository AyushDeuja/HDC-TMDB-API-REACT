import React, { useEffect, useState } from "react";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const fetchCustomMovies = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/movies/getAll", {
        method: "GET",
      });
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:2000/api/movies/createmovies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, img, description }),
        }
      );
      const newMovie = await response.json();
      setMovies((prevMovies) => [...prevMovies, newMovie]);
      setTitle("");
      setImg("");
      setDescription("");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  useEffect(() => {
    fetchCustomMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>

      <form onSubmit={handleAddMovie} className="mb-6">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter movie title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter movie description"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Movie
        </button>
      </form>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="border border-gray-300 p-2">{movie.title}</td>
              <td className="border border-gray-300 p-2">
                {movie.description}
              </td>
              <td className="border border-gray-300 p-2">
                {movie.img ? (
                  <img
                    src={movie.img}
                    alt={movie.title}
                    className="w-20 h-20 object-cover"
                  />
                ) : (
                  "No Image Available"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
