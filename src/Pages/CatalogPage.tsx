import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";

export default function CatalogPage({ state, dispatch }) {
  return (
    <React.Fragment>
      <Header />
      <Catalog state={state} dispatch={dispatch} />
      <Footer />
    </React.Fragment>
  );
}
