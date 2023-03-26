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
  type?: string;
  barcode?: number;
  quantity?: number;
}

export interface IState {
  products: IProduct[];
  productsInCart: IProduct[];
  numProducts: number;
  basketSum: number;
  quantityFromCard: number;
  price: number;
}
