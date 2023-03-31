export interface IProduct {
  id?: string;
  title?: string;
  name?: string;
  price: number;
  image?: string;
  image_m?: string;
  brand?: string;
  article?: number;
  manufacturer?: string;
  description?: string;
  size?: number;
  unit?: string;
  types?: string[];
  barcode?: number;
  quantity?: number;
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
