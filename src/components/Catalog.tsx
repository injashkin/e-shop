import "./Catalog.css";
import ProductCard from "./ProductCard";
import Search from "./Search";
import search from "../assets/search.svg";
import deleted from "../assets/deleted.svg";
import chevron2 from "../assets/chevron2.svg";
import brand1 from "../images/brand1.png";
import brand2 from "../images/brand2.png";
import brand3 from "../images/brand3.png";
import brand4 from "../images/brand4.png";
import brand5 from "../images/brand5.png";
import Checkbox from "./Checkbox";
import { AppContext } from "../App";
import { useContext, useState } from "react";
import { IProduct } from "../globalTypes";
import Button from "./Button";

const pages = [
  { id: 1, http: "", active: true },
  { id: 2, http: "", active: false },
  { id: 3, http: "", active: false },
  { id: 4, http: "", active: false },
  { id: 5, http: "", active: false },
];

const sort = [
  { id: "0", label: "По умолчанию" },
  { id: "1", label: "По названию" },
  { id: "2", label: "Сначала недорогие" },
  { id: "3", label: "Сначала дорогие" },
  { id: "4", label: "По производителю" },
  { id: "5", label: "По бренду" },
];

export default function Catalog() {
  const { state, dispatch } = useContext(AppContext);
  const [max, setMax] = useState("10000"); // (*)

  //let set = new Set();
  const arr = state.products.map((item) => item.manufacturer);
  //const unique = [...new Set(arr)];

  // Посчитывает сколько раз встречается каждое значение в массиве
  var obj = {};
  arr.forEach((item) => (obj[item] = (obj[item] || 0) + 1));

  // Преобразует объект в массив объектов
  const makers = Object.keys(obj).map((key, index) => ({
    id: index,
    label: key,
    count: obj[key],
  }));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: "SORT",
      data: { sortedData: sort, changed: e.target.value },
    });
  };

  const handleClick = (e) => {
    const sortPopoverElem = document.querySelector(
      ".catalog__sort-popover"
    ) as HTMLElement;

    if (e.target.closest(".catalog__sort")) {
      sortPopoverElem.classList.add("catalog__sort-popover_show");
    } else {
      sortPopoverElem.classList.remove("catalog__sort-popover_show");
    }

    if (e.target.closest(".catalog__btn-show")) {
      // Получает цены из диапазона цен
      const inputFilterMin = document.querySelector("input[name='filter-min']");
      const inputFilterMax = document.querySelector("input[name='filter-max']");
      let min = inputFilterMin.value;
      let max = inputFilterMax.value;

      // Создает массив из отмеченных чекбоксов
      const brandList = document.querySelector(".catalog-left__brand-list");
      const inputs = brandList.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      let checkboxes = Array.from(inputs, (input) => input.value);

      dispatch({
        type: "RANGE_FILTER",
        data: { min, max, checkboxes },
      });
    }
  };

  addEventListener("click", handleClick);

  return (
    <div className="catalog container">
      <div className="catalog__bread-crumbs">
        <div>Главная</div>
        <div className="separator"></div>
        <div>Косметика и гигиена</div>
      </div>
      <div className="catalog__header">
        <h1>Косметика и гигиена</h1>
        <div className="catalog__sort-wrapper">
          <div className="catalog__sort">
            <span>Сортировка:</span>
            <a>
              <span>{state.sortedName}</span>
            </a>
          </div>
          <div
            className="catalog__sort-popover"
            onChange={(e) => handleChange(e)}
          >
            {sort.map((item) => (
              <Checkbox key={item.id} type="radio" value={item.id} {...item} />
            ))}
          </div>
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
                <input
                  defaultValue="0"
                  name="filter-min"
                  type="number"
                  min="0"
                />
              </div>
              -
              <div>
                <input
                  defaultValue="10000"
                  name="filter-max"
                  type="number"
                  min="0"
                  //value={max} (*)
                  //onChange={(e) => setMax(e.target.value) (*)
                />
              </div>
            </div>
          </div>
          <div className="catalog-left__brand">
            <div>Производитель</div>
            <Search icon={search} />
            <div className="catalog-left__brand-list">
              {makers.map((maker) => (
                <Checkbox key={maker.id} value={maker.label} {...maker} />
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
          <div className="catalog__controls">
            <Button text="Показать" className="catalog__btn-show" />
            <Button icon={deleted} className="catalog__btn-delete" />
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
            {state.sortedProducts.map((product: IProduct) => (
              <ProductCard key={product.id} mod="cat" {...product} />
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
function dispatch(arg0: { type: string; data: { id: any; quantity: number } }) {
  throw new Error("Function not implemented.");
}
