import React, { useReducer } from "react";
import update from "immutability-helper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./Pages/Error";
import Basket from "./Pages/BasketPage";
import Catalog from "./Pages/CatalogPage";
import BasketPage from "./Pages/BasketPage";
import Card from "./Pages/Card";

// Create context object
export const AppContext = React.createContext();

// Set up Initial State
const initialState = {
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  basketSum: 0,
  testText: "Hello world",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_INPUT":
      return update(state, { quantityFromCard: { $set: action.data } });
    case "UPDATE_NUM":
      return update(state, { numProducts: { $set: action.data } });
    case "ADD_TO_BASKET_PRICE":
      return update(state, { price: { $set: action.data } });
    case "UPDATE_SUM":
      return update(state, { basketSum: { $set: action.data } });
    default:
      return initialState;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Card />,
  },
  {
    path: "/card",
    element: <Card />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/basket",
    element: <BasketPage />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
]);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <React.StrictMode>
      <AppContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </React.StrictMode>
  );
}
