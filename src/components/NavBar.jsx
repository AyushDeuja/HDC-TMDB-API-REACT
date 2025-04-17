import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/movieSlice";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchTerm)); // Update Redux store with search term
  };

  return (
    <nav className="flex items-center justify-between p-2 bg-gray-600 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <img
          className="w-44 mx-auto md:mx-0"
          src={LOGO_URL}
          alt="netflix-logo"
        />
        <ul className="flex items-center gap-6 cursor-pointer">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 relative 
            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
            after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
              isActive ? "after:w-full text-green-400" : ""
            }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 relative 
            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
            after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
              isActive ? "after:w-full text-green-400" : ""
            }`
              }
            >
              Trending
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 relative 
            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
            after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
              isActive ? "after:w-full text-green-400" : ""
            }`
              }
            >
              Favourites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 relative 
            after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
            after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
              isActive ? "after:w-full text-green-400" : ""
            }`
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <input
          type="text"
          className="p-2 rounded bg-white text-black focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors"
        >
          Search
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
