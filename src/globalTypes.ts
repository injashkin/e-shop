export const typesOfCare = [
  "Уход за телом",
  "Уход за руками",
  "Уход за ногами",
  "Уход за лицом",
  "Уход за волосами",
  "Средства для загара",
  "Средства для бритья",
  "Подарочные наборы",
  "Гигиеническая продукция",
  "Гигиена полости рта",
  "Бумажная продукция",
];

export interface IProduct {
  id: string;
  title: string;
  name: string;
  price: number;
  image_m: string;
  brand: string;
  article: number;
  manufacturer: string;
  description: string;
  size: number;
  unit: string;
  types: string[];
  barcode: number;
  quantity: number;
}

export interface IState {
  products: IProduct[];
  productsInCart: IProduct[];
  sortedProducts: IProduct[];
  sortedName: string;
  numProducts: number;
  totalSum: number;
  quantityFromCard: number;
  price: number;
  currentPageCatalog: number;
  productsPerPage: number;
}

export interface IAction {
  type: string;
  data: IData;
}

export interface IData {
  id: string;
  quantityFromCard: number;
  sortedData: ISortedData[];
  changed: string;
  min: number;
  max: number;
  checkboxes: string[];
  currentProducts: IProduct;
  currentPage: number;
  type: string;
}

interface ISortedData {
  id: string;
  label: string;
  http: string;
  count: string;
}