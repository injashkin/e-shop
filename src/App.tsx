import React, { createContext, useReducer } from "react";
import update from "immutability-helper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./Pages/Error";
import BasketPage from "./Pages/BasketPage";
import CardPage from "./Pages/CardPage";
import { IProduct, IState } from "./globalTypes";
import { ProductDetail } from "./Pages/ProductDetail";
import CatalogPage from "./Pages/CatalogPage";
import reducer, { initialState } from "./reducer";



export const AppContext = React.createContext<IState | null>(initialState);



function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <CatalogPage state={state} dispatch={dispatch} />,
    },
    {
      path: "/catalog/:title",
      element: <CardPage state={state} dispatch={dispatch} />,
    },
    {
      path: "/card",
      element: <CardPage state={state} dispatch={dispatch} />,
    },
    {
      path: "/catalog",
      element: <CatalogPage state={state} dispatch={dispatch} />,
    },
    {
      path: "/basket",
      element: <BasketPage state={state} dispatch={dispatch} />,
    },
    {
      //path: "/error",
      //element: <ErrorPage />,
    },
  ]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
