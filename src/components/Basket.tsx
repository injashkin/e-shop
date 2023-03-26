import ProductCard from "./ProductCard";
import "./Basket.css";
import Button from "./Button";

//...{ mod: basket.mod, product: product }

export default function Basket({ state, dispatch }) {
  return (
    <div>
      <div className="basket container">
        <div className="basket__bread-crumbs">
          <div>Главная</div>
          <div className="separator"></div>
          <div>Корзина</div>
        </div>

        <h1>Корзинa</h1>

        {state.productsInCart.map((product) => (
          <ProductCard key={product.id} mod="row" {...product} />
        ))}

        <div className="basket__bottom">
          <Button text="Оформить заказ"></Button>
          <div className="basket__sum">{state.basketSum} ₸</div>
        </div>
      </div>
    </div>
  );
}
