import React, { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/movieSlice";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(setSearchQuery(searchTerm)); // Update Redux store with search term
  };

  return (
    <nav className="flex flex-wrap items-center justify-between p-2 bg-gray-600 text-white shadow-lg sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <img className="w-32 md:w-44" src={LOGO_URL} alt="netflix-logo" />
        {/* Hamburger Menu for Mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full md:flex md:items-center md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mt-4 md:mt-0">
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
              to="/admin"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors duration-300 relative 
                after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
                after:left-0 after:transition-all after:duration-300 hover:after:w-full ${
                  isActive ? "after:w-full text-green-400" : ""
                }`
              }
            >
              Admin
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <input
          type="text"
          className="p-2 rounded bg-white text-black focus:outline-none w-full md:w-auto"
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
