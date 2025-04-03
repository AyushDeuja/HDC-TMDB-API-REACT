import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Trending from "./components/Trending";
import MovieDetails from "./components/MovieDetails";
import { Provider } from "react-redux";
import About from "./components/About";
import store from "./redux/store";

function AppLayout() {
  return (
    <Provider store={store}>
      <NavBar />
      <Outlet />
    </Provider>
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
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
