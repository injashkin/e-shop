import BasketCard from "./BasketCard";
import "./Basket.css";

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
      </div>
    </div>
  );
}
