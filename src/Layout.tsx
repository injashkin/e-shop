import React from "react";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Main } from "./components/Main";


export default function Layout() {

  return (
    <React.Fragment>
      <Header />
      <Breadcrumb />
      <Main />
      <Footer />
    </React.Fragment>
  );
}
