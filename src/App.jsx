import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Trending from "./components/Trending";
import MovieDetails from "./components/MovieDetails";
import { Provider } from "react-redux";
import About from "./components/About";
import store from "./redux/store";
import FavouriteMovies from "./components/FavouriteMovies";
import ThemeToggler from "./components/ThemeToggler";
import { Suspense } from "react";

// lazy loading the components
// This is a performance optimization technique that allows you to load components only when they are needed, rather than loading them all at once when the app starts. This can help reduce the initial load time of your app and improve its overall performance.
// const NavBar = lazy(() => import("./components/Card"));
// const Trending = lazy(() => import("./components/Trending"));
// const MovieDetails = lazy(() => import("./components/MovieDetails"));
// const About = lazy(() => import("./components/About"));
// const FavouriteMovies = lazy(() => import("./components/FavouriteMovies"));
// const Movies = lazy(() => import("./components/Movies"));

function AppLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <NavBar />
        <Outlet />
      </Provider>
    </Suspense>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/movieDetails/:id",
        element: <MovieDetails />,
      },
      {
        path: "/favourites",
        element: <FavouriteMovies />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
