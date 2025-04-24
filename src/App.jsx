import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";

import NavBar from "./components/NavBar";
import Movies from "./components/Movies";
import Trending from "./components/Trending";
import MovieDetails from "./components/MovieDetails";
import FavouriteMovies from "./components/FavouriteMovies";
// import ThemeToggler from "./components/ThemeToggler";
import Login from "./components/Login";

import AuthProvier from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import store from "./redux/store";
import Admin from "./components/Admin";

// You can enable lazy loading like this later:
// const Movies = lazy(() => import("./components/Movies"));
// const Trending = lazy(() => import("./components/Trending"));
// const MovieDetails = lazy(() => import("./components/MovieDetails"));
// const About = lazy(() => import("./components/About"));
// const FavouriteMovies = lazy(() => import("./components/FavouriteMovies"));

function AppLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <AuthProvier>
          <NavBar />
          <Outlet />
        </AuthProvier>
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
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/movieDetails/:id",
        element: <MovieDetails />,
      },
      {
        path: "/favourites",
        element: (
          <PrivateRoute>
            <FavouriteMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
