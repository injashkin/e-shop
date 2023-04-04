import ProductCard from "./ProductCard";
import "./Basket.css";
import Button from "./Button";
import { useContext } from "react";
import { AppContext } from "../App";
import { IProduct, IProductInCart, IState } from "../globalTypes";

export default function Basket() {
  const { state } = useContext(AppContext);
  return (
    <div>
      <div className="basket container">
        <div className="basket__bread-crumbs">
          <div>Главная</div>
          <div className="separator"></div>
          <div>Корзина</div>
        </div>

        <h1>Корзинa</h1>

        {state.productsInCart.map((product: IProductInCart) => (
          <ProductCard key={product.product.id} mod="row" product={product.product} />
        ))}

        <div className="basket__bottom">
          <Button text="Оформить заказ" onClick={(e) => (e)}></Button>
          <div className="basket__sum">{state.totalSum} ₸</div>
        </div>
      </div>
    </div>
  );
}
