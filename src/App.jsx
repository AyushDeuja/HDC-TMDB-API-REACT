import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Trending from "./components/Trending";
import MovieDetails from "./components/MovieDetails";

function AppLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
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
        path: "/movieDetails/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
