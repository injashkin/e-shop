import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { IProduct, IState } from "../globalTypes";

export function ProductDetail (state: IState, dispatch) {
  //const state = useContext(AppContext);
  const { title } = useParams();
  //const product: IProduct = state?.products.find(
  //  (product) => product.title?.trim() === title?.trim()
  //) as IProduct;

 // {state?.products[0].title}

  console.log("Product", state)
  return <h2>sdfgsdgsdgs dfgsdfgs</h2>;
};
