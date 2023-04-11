import React, { createContext, useContext, useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./Pages/Error";
import BasketPage from "./Pages/BasketPage";
import CardPage from "./Pages/CardPage";
import { IAction, IState } from "./globalTypes";
import CatalogPage from "./Pages/CatalogPage";
import reducer, { initialState } from "./reducer";
import Admin from "./components/Admin";
import Layout from "./Layout";

export type GlobalContent = {
  state: IState;
  dispatch: IAction;
};

export const AppContext = createContext<{
  state: IState;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <CatalogPage />,
          },
          {
            path: "catalog/:title",
            element: <CardPage />,
          },
          {
            path: "catalog",
            element: <CatalogPage />,
          },
          {
            path: "basket",
            element: <BasketPage />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "*",
            element: <ErrorPage />,
          },
        ],
      },
    ],
    //{
    //  basename: "/e-shop",
    //}
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
