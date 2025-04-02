import React from "react";
import { LOGO_URL } from "../utils/constants";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-2 bg-gray-600 text-white shadow-lg">
      <div className="flex items-center gap-6">
        <img
          className="w-44 mx-auto md:mx-0"
          src={LOGO_URL}
          alt="netflix-logo"
        />
        <ul className="flex items-center gap-6 cursor-pointer">
          <li
            className="text-lg font-medium hover:text-green-400 transition-colors duration-300 relative 
                after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
                after:left-0 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </li>
          <li
            className="text-lg font-medium hover:text-green-400 transition-colors duration-300 relative 
                after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
                after:left-0 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </li>
          <li
            className="text-lg font-medium hover:text-green-400 transition-colors duration-300 relative 
                after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-400 after:bottom-[-4px] 
                after:left-0 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 text-lg">
        <input
          type="text"
          className="p-2 rounded bg-white text-black focus:outline-none"
          placeholder="Search..."
        />
        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors">
          Search
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
