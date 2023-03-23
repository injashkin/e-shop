import React, { useContext } from "react";
import { AppContext } from "../App";

import "./ShopCard.css";
import imgProduct from "../images/biomio.png";
import basket from "../assets/basket.svg";
import download from "../assets/download.svg";
import dotLine from "../assets/dot-line.svg";
import share from "../assets/share.svg";
import Button from "./Button";

export interface ShopCardProps {
  id: string;
  name: string;
  price: number;
  images: string;
  brand: string;
  article: number;
  barcode: number;
  manufacturer: string;
  description: string;
  size: number;
  type: string;
}

export default function ShopCard(props: ShopCardProps) {
  const {
    id,
    name,
    price,
    images,
    brand,
    barcode,
    article,
    manufacturer,
    description,
    size,
    type,
  } = props;

  const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  //const [count, setCount] = useState(1);

  function minus(e) {
    if (state.quantityFromCard > 0)
      changeInputValue(state.quantityFromCard - 1);
  }

  function plus(e) {
    changeInputValue(state.quantityFromCard + 1);
  }

  function addToBasket() {
    dispatch({ type: "UPDATE_INPUT", data: state.quantityFromCard });
    dispatch({ type: "ADD_TO_BASKET_PRICE", data: price });

    dispatch({
      type: "UPDATE_NUM",
      data: state.numProducts + state.quantityFromCard,
    });

    dispatch({
      type: "UPDATE_SUM",
      data: state.basketSum + price * state.quantityFromCard,
    });
  }

  return (
    <div id={"product-" + id} className="card">
      <div className="image">
        <img className="activator" src={imgProduct} alt="" />
      </div>
      <div className="card__right-side">
        <header className="card__header">
          <span>{brand} </span>
          <span>{name}</span>
        </header>

        <div className="card__form">
          <div className="card__price">
            <span>{`${price}₸`}</span>
          </div>
          <button className="btn-small card__minus" onClick={minus}>
            -
          </button>
          <input
            type="number"
            id="card-quantity"
            name="quantity"
            className="quantity"
            value={state.quantityFromCard}
            onChange={(e) => changeInputValue(e.target.value)}
          ></input>

          <button className="btn-small card__plus" onClick={plus}>
            +
          </button>
          <Button
            text="В корзину"
            icon={basket}
            className="card__basket-btn"
            name="card-basket-btn"
            onClick={addToBasket}
          />
        </div>

        <div className="card__additional">
          <a
            id="card-share"
            className="share ui-link"
            href=""
            rel="nofollow noopener"
          >
            <img src={share}></img>
          </a>
          <div className="card__promo">
            При покупке от 10 000 ₸ бесплатная доставка по Кокчетаву и области
          </div>

          <button
            type="button"
            id="card-buy"
            className="card__download"
            name="download"
          >
            <span>Прайс-лист</span>
            <img src={download} />
          </button>
        </div>

        <div className="card__detail">
          <div>
            <span>Производитель: </span>
            <span>{manufacturer}</span>
          </div>
          <div>
            <span>Бренд: </span>
            <span>{brand}</span>
          </div>
          <div>
            <span>Артикул: </span>
            <span>{article}</span>
          </div>
          <div>
            <span>Штрихкод: </span>
            <span>{barcode}</span>
          </div>
        </div>

        <div className="card__description">
          <h3>Описание</h3>
          <p>{description}</p>
        </div>

        <img src={dotLine}></img>

        <div className="card__characteristic">
          <h3>Характеристики </h3>

          <div>
            <span>Производитель: </span>
            <span>{manufacturer}</span>
          </div>
          <div>
            <span>Бренд: </span>
            <span>{brand}</span>
          </div>
          <div>
            <span>Артикул: </span>
            <span>{article}</span>
          </div>
          <div>
            <span>Штрихкод: </span>
            <span>{barcode}</span>
          </div>
          <div>
            <span>Вес: </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
          <div>
            <span>Объем:м </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
          <div>
            <span>Кол-во в коробке: </span>
            <span>{size} </span>
            <span>{type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
