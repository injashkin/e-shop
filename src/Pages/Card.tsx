import React, { useReducer } from "react";
import update from "immutability-helper";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Content from "../components/Content";

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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      <AppContext.Provider value={{ state, dispatch }}>
        <Header />
        <Content />
        <Footer />
      </AppContext.Provider>
    </React.Fragment>
  );
}
