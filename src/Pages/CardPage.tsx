import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopCard from "../components/ShopCard";

export default function CardPage() {
  //const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      {/*<AppContext.Provider value={{ state, dispatch }}>*/}
      <Header />
      <main className="container">
        <ShopCard />
      </main>
      <Footer />
      {/*</AppContext.Provider>*/}
    </React.Fragment>
  );
}
