import { IAction, IProduct, IProductInCart, IState } from "./globalTypes";
import products from "./products.json";

export enum Types {
  CHANGE_QUANTITY = "CHANGE_QUANTITY",
  REMOVE = "REMOVE",
  UPDATE_SUM = "UPDATE_SUM",
  UPDATE_TOTAL_NUM = "UPDATE_TOTAL_NUM",
  MINUS_QUANTITY = "MINUS_QUANTITY",
  PLUS_QUANTITY = "PLUS_QUANTITY",
  UPDATE_NUM = "UPDATE_NUM",
  ADD_TO_CART = "ADD_TO_CART",
  FILTER = "FILTER",
  PAGINATION = "PAGINATION",
}

type SetCartAction = {
  type: typeof Types.PAGINATION;
  team: string;
};

export const initialState: IState = {
  products: products,
  sortedProducts: [...products],
  productsInCart: [],
  sortedName: "По умолчанию",
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  totalSum: 0,
  currentPageCatalog: 1,
  productsPerPage: 6,
};

export default function reducer(state: IState, action: IAction): IState {
  const { type, data } = action;
  let index: number | undefined;
  let newProductsInCart: IProductInCart[] = [];

  console.log(type);

  switch (type) {
    case "SELECT":
      let product = state.productsInCart.find(
        (item) => item.product.barcode === data.barcode
      )!;

      if (product) {
        newProductsInCart = state.productsInCart;
      } else {
        newProductsInCart.push({
          product: state.products.find(
            (item) => item.barcode === data.barcode
          )!,
          quantity: 0,
        });
      }

      return { ...state, productsInCart: newProductsInCart };

    case "PLUS_QUANTITY":

      index = state.productsInCart.findIndex(
        (item) => item.product.barcode === data.barcode
      );

      newProductsInCart = state.productsInCart;

      if (newProductsInCart[index].quantity) {
        newProductsInCart[index].quantity =
          (newProductsInCart[index].quantity as number) + 1;
      } else newProductsInCart[index].quantity = 1;

      return {
        ...state,
        productsInCart: newProductsInCart,
      };

    case "MINUS_QUANTITY":
      index = state.productsInCart.findIndex(
        (item) => item.product.barcode === data.barcode
      );

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
      };

    case "UPDATE_QUANTITY":
      index = state.productsInCart.findIndex(
        (item) => item.product.id === data.id
      );
      newProductsInCart = [...state.productsInCart];

      newProductsInCart[index].quantity = data.quantityFromCard;
      return {
        ...state,
        productsInCart: newProductsInCart,
      };

    case "REMOVE":
      newProductsInCart = state.productsInCart.filter(
        (product) => product.product.id !== data.id
      );
      return { ...state, productsInCart: newProductsInCart };

    case "ADD_TO_CART":
      return { ...state, productsInCart: data.productsInCart };

    case "UPDATE_TOTAL_NUM":
      let num = 0;

      state.productsInCart.forEach((product) => {
        if (product.quantity) {
          num = num + product.quantity;
        }
      });
      return { ...state, numProducts: num };

    case "UPDATE_SUM":
      let sum = 0;
      state.productsInCart.forEach((product) => {
        sum = +(sum + product.product.price * product.quantity).toFixed(2);
      });
      return { ...state, totalSum: sum };

    case "SORT":
      let sorted: IProduct[] = [];
      let sortedName: string = data.sortedData[+data.changed].label;

      if (data.changed === "0") {
        sorted = [...state.products].sort((a, b) =>
          b.name! < a.name! ? 1 : -1
        );
      }
      if (data.changed === "1") {
        sorted = [...state.products].sort((a, b) =>
          b.name! > a.name! ? 1 : -1
        );
      }
      if (data.changed === "2") {
        sorted = [...state.products].sort((a, b) => a.price - b.price);
      }
      if (data.changed === "3") {
        sorted = [...state.products].sort((a, b) => b.price - a.price);
      }

      return { ...state, sortedProducts: sorted, sortedName: sortedName };

    case "FILTER":
      let filtered = state.products;

      if (data.min && data.max) {
        filtered = filtered.filter(
          (item) => item.price >= data.min && item.price <= data.max
        );
      }

      if (data.type) {
        filtered = filtered.filter(function (item) {
          return item.types?.find((item2) => {
            return item2 == data.type.toLowerCase();
          })
            ? true
            : false;
        });
      }

      if (data.checkboxes && data.checkboxes.length) {
        // Ищет совпадения в массивах
        filtered = filtered.filter(function (item) {
          return data.checkboxes.indexOf(item.manufacturer!) !== -1;
        });
      }

      return { ...state, sortedProducts: filtered };

    case "PAGINATION":
      return {
        ...state,
        sortedProducts: data.currentProducts,
        currentPageCatalog: data.currentPage,
      };

    case "UPDATE_INPUT":
      return { ...state, quantityFromCard: data.newValue };
    case "ADD_TO_BASKET_PRICE":
      return { ...state, price: data.price };
    case "CLEAR_CART":
      return { ...state, productsInCart: [], numProducts: 0, totalSum: 0 };
    default:
      return { ...state };
  }
}
