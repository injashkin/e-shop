import React, { createContext, useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./Pages/Error";
import BasketPage from "./Pages/BasketPage";
import CardPage from "./Pages/CardPage";
import { IState } from "./globalTypes";
import CatalogPage from "./Pages/CatalogPage";
import reducer, { initialState } from "./reducer";
import Admin from "./components/Admin";

export const AppContext = React.createContext<IState | null>(initialState);

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CatalogPage />,
    },
    {
      path: "/catalog/:title",
      element: <CardPage />,
    },
    {
      path: "/card",
      element: <CardPage />,
    },
    {
      path: "/catalog",
      element: <CatalogPage />,
    },
    {
      path: "/basket",
      element: <BasketPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
