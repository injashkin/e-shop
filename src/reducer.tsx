import { IProduct, IState } from "./globalTypes";
import products from "./products2.json";

export const initialState: IState = {
  products: products,
  productsInCart: [],
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  basketSum: 0,
};

export default function reducer(state: IState, action) {
  const { type, data } = action;
  let index: number | undefined;
  let newProductsInCart: IProduct[];

  console.log(type);

  const getIndex = () => {
    return state.products.findIndex((item) => item.id === data);
  };

  switch (type) {
    case "PLUS_QUANTITY":
      index = state.productsInCart.findIndex((item) => item.id === data.id);
      newProductsInCart = [...state.productsInCart];

      if (newProductsInCart[index].quantity) {
        newProductsInCart[index].quantity =
          (newProductsInCart[index].quantity as number) + 1;
      } else newProductsInCart[index].quantity = 1;

      console.log("state", state.productsInCart[index]);
      return { ...state, productsInCart: newProductsInCart };

    case "MINUS_QUANTITY":
      index = state.productsInCart.findIndex((item) => item.id === data.id);
      newProductsInCart = [...state.productsInCart];

      let quantity = newProductsInCart[index].quantity;

      if (quantity && quantity > 0) {
        newProductsInCart[index].quantity =
          (newProductsInCart[index].quantity as number) - 1;
      }

      console.log("state", state.productsInCart[index]);
      return { ...state, productsInCart: newProductsInCart };
    case "UPDATE_INPUT":
      return { ...state, quantityFromCard: action.data };
    case "UPDATE_NUM":
      return { ...state, numProducts: action.data };
    case "ADD_TO_BASKET_PRICE":
      return { ...state, price: action.data };
    case "UPDATE_SUM":
      return { ...state, basketSum: action.data };
    case "ADD_TO_CART":
      return { ...state, productsInCart: action.data };
    default:
      return initialState;
  }
}