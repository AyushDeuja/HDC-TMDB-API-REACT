import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <p>CurrentTheme: {theme}</p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"}
      </button>
    </div>
  );
};

export default ThemeToggler;
