import "./Catalog.css";
import products from "../products2.json";
import BasketCard from "./BasketCard";

console.log(products[0].brand);

export default function Catalog() {
  return (
    <div className="catalog container">
      <div className="catalog__bread-crumbs">
        <div>Главная</div>
        <div className="separator"></div>
        <div>Косметика и гигиена</div>
      </div>
      <div className="catalog__header">
        <h1>Косметика и гигиена</h1>
        <div className="catalog__sort">
          <span>Сортировка: </span>
          <div>Название</div>
        </div>
      </div>

      <div className="catalog__top-filter">
        <li>Уход за телом</li>
        <li>Уход за руками</li>
        <li>Уход за ногами</li>
        <li>Уход за лицом</li>
        <li>Уход за волосами</li>
        <li>Средства для загара</li>
        <li>Средства для бритья</li>
        <li>Подарочные наборы</li>
        <li>Гигиеническая продукция</li>
        <li>Гигиена полости рта</li>
        <li>Бумажная продукция</li>
      </div>
      <div className="catalog__main">
        <div className="catalog__left-col">
          <div>Подбор по параметрам</div>
          <div>Цена</div>
          <div>
            <div>0</div>-<div>10000</div>
            <div>Производитель</div>
            <div>Поиск</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
          <div></div>
        </div>
        <div>
          <div className="catalog__products">
            {products.map((prod) => (
              <BasketCard {...prod} />
            ))}
          </div>
          <div>23534</div>
        </div>
      </div>
    </div>
  );
}
