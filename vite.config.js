import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dotenv from "dotenv";
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // plugins: [tailwindcss()],
  define: {
    //env variables from .env file
    "process.env.REACT_APP_TMDB_KEY": JSON.stringify(
      process.env.REACT_APP_TMDB_KEY
    ),
  },
});
