import "./Catalog.css";
import ProductCard from "./ProductCard";
import Search from "./Search";
import search from "../assets/search.svg";
import deleted from "../assets/deleted.svg";
import brand1 from "../images/brand1.png";
import brand2 from "../images/brand2.png";
import brand3 from "../images/brand3.png";
import brand4 from "../images/brand4.png";
import brand5 from "../images/brand5.png";
import Checkbox from "./Checkbox";
import { AppContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { IProduct, typesOfCare } from "../globalTypes";
import Button from "./Button/Button";
import React from "react";
import Pagination from "./Pagination";
import PriceRange from "./PriceRange/PriceRange";

const sort = [
  { id: "0", label: "Название" },
  { id: "1", label: "Название (Я-А)" },
  { id: "2", label: "Сначала недорогие" },
  { id: "3", label: "Сначала дорогие" },
];

const defaultPriceMin = "0";
const defaultPriceMax = "10000";

export type Current = "prev" | "next" | "number";

export default function Catalog() {
  const { state, dispatch } = useContext(AppContext);

  const [priceMin, setPriceMin] = useState(defaultPriceMin);
  const [priceMax, setPriceMax] = useState(defaultPriceMax);

  function handleMax(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceMax((e.target as HTMLInputElement).value);
  }

  function handleMin(e: React.ChangeEvent<HTMLInputElement>) {
    setPriceMin((e.target as HTMLInputElement).value);
  }

  const arr = state.products.map((item: IProduct) => item.manufacturer);

  type My = { [obj: string]: string };

  // Посчитывает сколько раз встречается каждое значение в массиве
  let obj: My = {};
  let count;
  arr.forEach((item) => {
    return (obj[item] = ((+obj[item] || 0) + 1).toString());
  });

  // Преобразует объект в массив объектов
  const makers = Object.keys(obj).map((key, index) => ({
    id: index,
    label: key,
    count: obj[key],
  }));

  const handleChangeSort = (value: string | number) => {
    dispatch({
      type: "SORT",
      data: { sortedData: sort, changed: value },
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const targetDiv = e.target as HTMLElement;
    const sortWrapper: HTMLElement | null = targetDiv.closest(
      ".catalog__sort-wrapper"
    );
    const sortWrapperMobile: HTMLElement | null = targetDiv.closest(
      ".catalog__sort-wrapper--mobile"
    );

    let parent: HTMLElement = document.body;

    if (sortWrapperMobile) {
      parent = sortWrapperMobile;
    }

    if (sortWrapper) {
      parent = sortWrapper;
    }

    const sortPopoverElem = parent.querySelector(
      ".catalog__sort-popover"
    ) as HTMLElement;

    if (parent == sortWrapperMobile || parent == sortWrapper) {
      sortPopoverElem.classList.add("catalog__sort-popover_show");
    } else {
      document
        .querySelectorAll(".catalog__sort-popover")
        .forEach((elem) => elem.classList.remove("catalog__sort-popover_show"));
    }

    if (
      targetDiv.closest(".catalog__btn-show") ||
      targetDiv.closest(".catalog__btn-delete")
    ) {
      // Создает массив из отмеченных чекбоксов
      const brandList = document.querySelector(
        ".catalog__left-brand-list"
      ) as HTMLElement;
      const inputs = brandList.querySelectorAll(
        "input[type=checkbox]:checked"
      ) as NodeListOf<HTMLInputElement>;
      let checkboxes = Array.from(inputs, (input) => input.value);

      dispatch({
        type: "FILTER",
        data: { min: priceMin, max: priceMax, checkboxes: checkboxes },
      });

      if (targetDiv.closest(".catalog__btn-delete")) {
        dispatch({
          type: "FILTER",
          data: { min: defaultPriceMin, max: defaultPriceMax, Checkbox: [] },
        });

        setPriceMin(defaultPriceMin);
        setPriceMax(defaultPriceMax);

        inputs.forEach((elem) => (elem.checked = false));
      }
    }

    const targetInput = e.target as HTMLInputElement;

    if (
      targetInput.closest(".catalog__top-filter-label") ||
      targetInput.closest(".catalog__left-filter-label")
    ) {
      let type = targetInput.value;

      dispatch({
        type: "FILTER",
        data: { type },
      });
    }
  };

  function paginate(current: Current) {
    let currentProducts;
    let currentPage = state.currentPageCatalog;
    let totalProducts = state.products.length;
    let totalPage = Math.ceil(totalProducts / state.productsPerPage);

    if (current === "prev") {
      if (state.currentPageCatalog > 1) {
        currentPage = state.currentPageCatalog - 1;
      }
    }

    if (current === "next") {
      if (state.currentPageCatalog < totalPage) {
        currentPage = state.currentPageCatalog + 1;
      }
    }

    if (typeof current === "number") currentPage = current;
    const lastProductIndex = currentPage * state.productsPerPage;
    const firstProductIndex = lastProductIndex - state.productsPerPage;
    currentProducts = state.products.slice(firstProductIndex, lastProductIndex);

    dispatch({
      type: "PAGINATION",
      data: { currentProducts, currentPage },
    });
  }

  useEffect(() => {
    document.title = "Каталог";
  }, []);

  return (
    <div className="catalog container" onClick={handleClick}>
      <div className="catalog__header">
        <h1>Каталог</h1>

        <div className="catalog__sort-wrapper">
          <div className="catalog__sort">
            <span>Сортировка:</span>
            <a>
              <span>{state.sortedName}</span>
            </a>
          </div>
          <div className="catalog__sort-popover">
            {sort.map((item) => (
              <Checkbox
                key={item.id}
                type="radio"
                value={item.id}
                handleChange={handleChangeSort}
                {...item}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="catalog__top-filter">
        {typesOfCare.map((item, index) => (
          <label key={index} className="catalog__top-filter-label">
            <span>{item}</span>
            <input value={item} type="radio" name="types-of-care" />
          </label>
        ))}
      </div>
      <div className="catalog__main">
        <div className="catalog__left">
          <div>ПОДБОР ПО ПАРАМЕТРАМ</div>
          <div className="catalog__left-by-price">
            <div>Цена ₸</div>

            <PriceRange
              defaultMin={priceMin}
              defaultMax={priceMax}
              getMin={handleMin}
              getMax={handleMax}
            ></PriceRange>
          </div>

          <div className="catalog__left-brand">
            <div>Производитель</div>
            <Search icon={search} />
            <div className="catalog__left-brand-list">
              {makers.map((maker) => (
                <Checkbox
                  key={maker.id}
                  value={maker.label}
                  handleChange={(e) => e}
                  {...maker}
                />
              ))}
            </div>
            <div>Показать все</div>
          </div>
          <div className="catalog__controls">
            <Button
              text="Показать"
              className="catalog__btn-show"
              onClick={(e) => e}
            />
            <Button
              icon={deleted}
              className="catalog__btn-delete"
              onClick={(e) => e}
            />
          </div>
          <div className="catalog__left-filter">
            {typesOfCare.map((item, index) => (
              <label key={index} className="catalog__left-filter-label">
                <span>{item}</span>
                <input value={item} type="radio" name="left-types-of-care" />
              </label>
            ))}
          </div>

          <div className="catalog__sort-wrapper catalog__sort-wrapper--mobile">
            <div className="catalog__sort">
              <span>Сортировка:</span>
              <a>
                <span>{state.sortedName}</span>
              </a>
            </div>
            <div className="catalog__sort-popover">
              {sort.map((item) => (
                <Checkbox
                  key={item.id}
                  type="radio"
                  value={item.id}
                  handleChange={handleChangeSort}
                  {...item}
                />
              ))}
            </div>
          </div>

          <div className="catalog__left-brands-logo">
            <div>Бренды</div>
            <div className="catalog__left-logos">
              <img src={brand1} />
              <img src={brand2} />
              <img src={brand3} />
              <img src={brand4} />
              <img src={brand5} />
            </div>
          </div>
        </div>
        <div className=".catalog__content">
          <div className="catalog__products">
            {state.sortedProducts.map((product: IProduct) => (
              <ProductCard key={product.id} mod="cat" product={product} />
            ))}
          </div>

          <div className="catalog__products catalog__products--mobile">
            {state.sortedProducts.map((product: IProduct) => (
              <ProductCard key={product.id} mod="cat-mob" product={product} />
            ))}
          </div>

          <div className="pagination">
            <Pagination paginate={paginate} />
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
