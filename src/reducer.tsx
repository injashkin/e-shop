import { IProduct, IState } from "./globalTypes";
import products from "./products.json";

export const initialState: IState = {
  products: products,
  productsInCart: [],
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  totalSum: 0,
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
      return {
        ...state,
        productsInCart: newProductsInCart,
        numProducts: state.numProducts + 1,
      };

    case "MINUS_QUANTITY":
      index = state.productsInCart.findIndex((item) => item.id === data.id);
      newProductsInCart = [...state.productsInCart];
      let numProducts = state.numProducts;

      let quantity = newProductsInCart[index].quantity;

      if (quantity && quantity > 0) {
        newProductsInCart[index].quantity =
          (newProductsInCart[index].quantity as number) - 1;
        numProducts = state.numProducts - 1;
      }
      return {
        ...state,
        productsInCart: newProductsInCart,
        numProducts: numProducts,
      };

    case "UPDATE_QUANTITY":
      index = state.productsInCart.findIndex((item) => item.id === data.id);
      newProductsInCart = [...state.productsInCart];

      console.log("AAAAAAA", index);

      newProductsInCart[index].quantity = data.quantityFromCard;
      return {
        ...state,
        productsInCart: newProductsInCart,
      };

    case "REMOVE":
      index = getIndex();
      newProductsInCart = state.productsInCart.filter(
        (product) => product.id !== data.id
      );
      return { ...state, productsInCart: newProductsInCart };

    case "UPDATE_SUM":
      let sum = 0;
      state.productsInCart.forEach((product) => {
        sum = sum + product.price * product.quantity!;
      });
      return { ...state, totalSum: sum };

    case "UPDATE_TOTAL_NUM":
      let num = 0;
      state.productsInCart.forEach((product) => {
        if(product.quantity) {
          num = num + product.quantity;
        }
        
      });
      return { ...state, numProducts: num };

    case "UPDATE_INPUT":
      return { ...state, quantityFromCard: action.data };
    case "ADD_TO_BASKET_PRICE":
      return { ...state, price: action.data };
    case "ADD_TO_CART":
      return { ...state, productsInCart: action.data };
    default:
      return { ...state };
  }
}
