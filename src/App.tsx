import React, { createContext, useReducer } from "react";
import update from "immutability-helper";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ErrorPage from "./Pages/Error";
import BasketPage from "./Pages/BasketPage";
import CardPage from "./Pages/CardPage";
import { IState } from "./globalTypes";
import { ProductDetail } from "./Pages/ProductDetail";
import products from "./products2.json";
import CatalogPage from "./Pages/CatalogPage";

const initialState: IState = {
  products: products,
  productsInCart: [],
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  basketSum: 0,
};

export const AppContext = React.createContext<IState | null>(null);

function reducer(state: IState, action) {
  switch (action.type) {
    case "UPDATE_INPUT":
      return update(state, { quantityFromCard: { $set: action.data } });
    case "UPDATE_NUM":
      return update(state, { numProducts: { $set: action.data } });
    case "ADD_TO_BASKET_PRICE":
      return update(state, { price: { $set: action.data } });
    case "UPDATE_SUM":
      return update(state, { basketSum: { $set: action.data } });
    case "ADD_TO_CART":
      return update(state, { productsInCart: { $set: action.data } });
    default:
      return initialState;
  }
}

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
    <React.StrictMode>
      <AppContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </React.StrictMode>
  );
}

export default App;
