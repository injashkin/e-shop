import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Catalog from "../components/Catalog";

export default function CatalogPage() {
  return (
    <React.Fragment>
      <Header />
      <Catalog />
      <Footer />
    </React.Fragment>
  );
}
