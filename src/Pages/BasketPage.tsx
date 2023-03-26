import React, { useReducer } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Basket from "../components/Basket";

export default function BasketPage({ state, dispatch }) {
  return (
    <React.Fragment>
      <Header />
      <Basket state={state} dispatch={dispatch} />
      <Footer />
    </React.Fragment>
  );
}
