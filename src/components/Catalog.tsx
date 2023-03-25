import "./Catalog.css";
import products from "../products2.json";
import BasketCard from "./BasketCard";
import Search from "./Search";
import search from "../assets/search.svg";
import chevron2 from "../assets/chevron2.svg";
import brand1 from "../images/brand1.png";
import brand2 from "../images/brand2.png";
import brand3 from "../images/brand3.png";
import brand4 from "../images/brand4.png";
import brand5 from "../images/brand5.png";
import Checkbox from "./Checkbox";

const makers = [
  { id: 1, name: "Grifon", count: 56 },
  { id: 2, name: "Boyscout", count: 66 },
  { id: 3, name: "Paclan", count: 166 },
  { id: 4, name: "Булгари Грин", count: 21 },
];

const pages = [
  { id: 1, http: "", active: true },
  { id: 2, http: "", active: false },
  { id: 3, http: "", active: false },
  { id: 4, http: "", active: false },
  { id: 5, http: "", active: false },
];

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
        <div className="catalog__left">
          <div>ПОДБОР ПО ПАРАМЕТРАМ</div>
          <div className="catalog-left__by-price">
            <div>Цена ₸</div>
            <div className="catalog-left__inputs">
              <div>
                <input type="number" min="0" placeholder="0" />
              </div>
              -
              <div>
                <input type="number" min="0" placeholder="10000" />
              </div>
            </div>
          </div>
          <div className="catalog-left__brand">
            <div>Производитель</div>
            <Search icon={search} />
            <div className="catalog-left__brand-list">
              {makers.map((maker) => (
                <Checkbox {...maker} />
              ))}
            </div>
            <div>Показать все</div>
          </div>
          <div className="catalog-left__filter">
            <div>Уход за телом</div>
            <div>Уход за руками</div>
            <div>Уход за ногами</div>
            <div>Уход за лицом</div>
            <div>Уход за волосами</div>
            <div>Средства для загара</div>
            <div>Средства для бритья</div>
            <div>Подарочные наборы</div>
            <div>Гигиеническая продукция</div>
            <div>Гигиена полости рта</div>
            <div>Бумажная продукция</div>
          </div>
          <div className="catalog-left__brands-logo">
            <div>Бренды</div>
            <div className="catalog-left__logos">
              <img src={brand1}></img>
              <img src={brand2}></img>
              <img src={brand3}></img>
              <img src={brand4}></img>
              <img src={brand5}></img>
            </div>
          </div>
        </div>
        <div>
          <div className="catalog__products">
            {products.map((prod) => (
              <BasketCard key={prod.id} {...prod} />
            ))}
          </div>
          <div className="pagination">
            <ul>
              <li>
                <a href="">
                  <img className="pagination__prev" src={chevron2} />
                </a>
              </li>
              {pages.map((page) => (
                <li className={`${page.active && "pagination__active"}`}>
                  <a key={page.id} href={page.http}>
                    {page.id}
                  </a>
                </li>
              ))}
              <li>
                <a href="">
                  <img className="pagination__next" src={chevron2} />
                </a>
              </li>
            </ul>
          </div>
          <p className="catalog__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis
            vulputate feugiat massa vestibulum duis. Faucibus consectetur
            aliquet sed pellentesque consequat consectetur congue mauris
            venenatis. Nunc elit, dignissim sed nulla ullamcorper enim,
            malesuada.
          </p>
        </div>
      </div>
    </div>
  );
}
