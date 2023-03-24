import BasketCard from "./BasketCard";
import "./Basket.css";
import Button from "./Button";

export default function Basket() {
  return (
    <div>
      <div className="basket container">
        <div className="basket__bread-crumbs">
          <div>Главная</div>
          <div className="separator"></div>
          <div>Корзина</div>
        </div>

        <h1>Корзинa</h1>

        <BasketCard />
        <BasketCard />
        <BasketCard />

        <div className="basket__bottom">
          <Button text="Оформить заказ"></Button>
          <div className="basket__sum">1 348,76 ₸</div>
        </div>
      </div>
    </div>
  );
}
