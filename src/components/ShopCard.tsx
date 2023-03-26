import React, { useContext } from "react";
import { AppContext } from "../App";

import "./ShopCard.css";
import imgProduct from "../images/biomio.png";
import basket from "../assets/basket.svg";
import download from "../assets/download.svg";
import dotLine from "../assets/dot-line.svg";
import share from "../assets/share.svg";
import Button from "./Button";
import { useParams } from "react-router-dom";
import { IProduct } from "../globalTypes";

export default function ShopCard({ state, dispatch }) {
  
  const { title } = useParams()
  const { products } = state
  const product: IProduct = products.find(index => index.title.trim() === title?.trim())

  //const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  function minus(e) {
    if (state.quantityFromCard > 0)
      changeInputValue(state.quantityFromCard - 1);
  }

  function plus(e) {
    changeInputValue(state.quantityFromCard + 1);
  }

  function addToCart() {
    dispatch({ type: "UPDATE_INPUT", data: state.quantityFromCard });
    dispatch({ type: "ADD_TO_BASKET_PRICE", data: product.price });

    dispatch({
      type: "UPDATE_NUM",
      data: state.numProducts + state.quantityFromCard,
    });

    dispatch({
      type: "UPDATE_SUM",
      data: state.basketSum + product.price * state.quantityFromCard,
    });

    dispatch({
      type: "ADD_TO_CART",
      data: state.productsInCart = [...state.productsInCart, product],
    });
  }

  console.log(state.productsInCart)

  return (
    <div id={"product-" + state.id} className="card">
      <div className="image">
        <img className="activator" src={imgProduct} alt="" />
      </div>
      <div className="card__right-side">
        <header className="card__header">
          <span>{product.brand} </span>
          <span>{product.name}</span>
        </header>

        <div className="card__form">
          <div className="card__price">
            <span>{`${product.price}₸`}</span>
          </div>
          <Button text="-" className="product-card__minus" onClick={minus} />
          <input
            type="number"
            id="card-quantity"
            name="quantity"
            className="quantity"
            value={state.quantityFromCard}
            onChange={(e) => changeInputValue(e.target.value)}
          ></input>

          <Button text="+" className="product-card__plus" onClick={plus} />
          <Button
            text="В корзину"
            icon={basket}
            className="card__basket-btn"
            name="card-basket-btn"
            onClick={addToCart}
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
            <span>{product.manufacturer}</span>
          </div>
          <div>
            <span>Бренд: </span>
            <span>{product.brand}</span>
          </div>
          <div>
            <span>Артикул: </span>
            <span>{product.article}</span>
          </div>
          <div>
            <span>Штрихкод: </span>
            <span>{product.barcode}</span>
          </div>
        </div>

        <div className="card__description">
          <h3>Описание</h3>
          <p>{product.description}</p>
        </div>

        <img src={dotLine}></img>

        <div className="card__characteristic">
          <h3>Характеристики </h3>

          <div>
            <span>Производитель: </span>
            <span>{product.manufacturer}</span>
          </div>
          <div>
            <span>Бренд: </span>
            <span>{product.brand}</span>
          </div>
          <div>
            <span>Артикул: </span>
            <span>{product.article}</span>
          </div>
          <div>
            <span>Штрихкод: </span>
            <span>{product.barcode}</span>
          </div>
          <div>
            <span>Вес: </span>
            <span>{product.size} </span>
            <span>{product.type}</span>
          </div>
          <div>
            <span>Объем:м </span>
            <span>{product.size} </span>
            <span>{product.type}</span>
          </div>
          <div>
            <span>Кол-во в коробке: </span>
            <span>{product.size} </span>
            <span>{product.type}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
