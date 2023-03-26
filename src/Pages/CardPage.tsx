import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopCard from "../components/ShopCard";

// Create context object
//export const AppContext = React.createContext();


export default function CardPage({ state, dispatch }) {
  //const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <React.Fragment>
      {/*<AppContext.Provider value={{ state, dispatch }}>*/}
      <Header />
      <main className="container">
        <ShopCard state={state} dispatch={dispatch} />
      </main>
      <Footer />
      {/*</AppContext.Provider>*/}
    </React.Fragment>
  );
}
