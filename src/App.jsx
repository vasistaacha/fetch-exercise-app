import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { AppProvider } from "./context/AppProvider";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import MatchPage from "./pages/MatchPage";
import ErrorPage from "./pages/ErrorPage";
import MainNav from "./components/MainNav";

const Layout = () => {
  return (
    <AppProvider>
      <MainNav />
      <Outlet />
    </AppProvider>
  );
};

{
  /* <p>
        Go To <Link to="favorites">fav</Link>
      </p>
      <p>
        Go To <Link to="search">search</Link>
      </p> */
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/match",
        element: <MatchPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
