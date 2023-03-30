import { IProduct, IState } from "./globalTypes";
import products from "./products.json";

export const initialState: IState = {
  products: products,
  productsInCart: [],
  sortedProducts: [...products],
  sortedName: "По умолчанию",
  numProducts: 0,
  price: 0,
  quantityFromCard: 1,
  totalSum: 0,
  currentPageCatalog: 1,
};

export interface ISortedData {
  id: string;
  label: string;
  http: string;
  count: string;
}

export interface IData {
  id: string;
  quantityFromCard: number;
  sortedData: ISortedData[];
  changed: string;
  min: number;
  max: number;
  checkboxes: string[];
}

export interface IAction {
  type: string;
  data: IData;
}

export default function reducer(state: IState, action: IAction) {
  const { type, data } = action;
  let index: number | undefined;
  let newProductsInCart: IProduct[];

  console.log(type);

  //const getIndex = () => {
  //  return state.products.findIndex((item) => item.id === data);
  //};

  switch (type) {
    case "PLUS_QUANTITY":
      index = state.productsInCart.findIndex((item) => item.id === data.id);
      newProductsInCart = [...state.productsInCart];

      if (newProductsInCart[index].quantity) {
        newProductsInCart[index].quantity =
          (newProductsInCart[index].quantity as number) + 1;
      } else newProductsInCart[index].quantity = 1;

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

      newProductsInCart[index].quantity = data.quantityFromCard;
      return {
        ...state,
        productsInCart: newProductsInCart,
      };

    case "REMOVE":
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
        if (product.quantity) {
          num = num + product.quantity;
        }
      });
      return { ...state, numProducts: num };

    case "SORT":
      let sorted: IProduct[] = [];
      let sortedName: string = data.sortedData[+data.changed].label;

      if (data.changed === "0") {
        sorted = [...state.products];
      }
      if (data.changed === "1") {
        sorted = [...state.products].sort((a, b) => (b.name < a.name ? 1 : -1));
      }
      if (data.changed === "2") {
        sorted = [...state.products].sort((a, b) => a.price - b.price);
      }
      if (data.changed === "3") {
        sorted = [...state.products].sort((a, b) => b.price - a.price);
      }
      if (data.changed === "4") {
        sorted = [...state.products].sort((a, b) =>
          b.manufacturer < a.manufacturer ? 1 : -1
        );
      }
      if (data.changed === "5") {
        sorted = [...state.products].sort((a, b) =>
          b.brand < a.brand ? 1 : -1
        );
      }
      return { ...state, sortedProducts: sorted, sortedName: sortedName };

    case "RANGE_FILTER":
      let filtered = state.products;

      if (data.min && data.max) {
        filtered = filtered.filter(
          (item) => item.price >= data.min && item.price <= data.max
        );
      }

      if (data.type) {
        filtered = filtered.filter(function (item) {
          return item.types.find((item2) => {
            return item2 == data.type.toLowerCase();
          })
            ? true
            : false;
        });
      }

      if (data.checkboxes && data.checkboxes.length) {
        // Ищет совпадения в массивах
        filtered = filtered.filter(function (item) {
          return data.checkboxes.indexOf(item.manufacturer) !== -1;
        });
      }

      return { ...state, sortedProducts: filtered };

    case "PAGINATION":
      return {
        ...state,
        sortedProducts: data.currentProducts,
        currentPageCatalog: data.currentPage,
      };

    /*
    case "TOP_FILTER":
      let typeFiltered = rangePrice.filter(function (item) {
        return item.types.find((item2) => {
          return item2 === data.type;
        })
          ? true
          : false;
      });
      return { ...state, sortedProducts: typeFiltered };
    */

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
