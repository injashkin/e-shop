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
import { IProduct, IProductInCart } from "../globalTypes";

export default function ShopCard() {
  const { state, dispatch } = useContext(AppContext);
  let { title } = useParams();

  let productInCart: IProductInCart = {
    product: state.products[0],
    quantity: 0,
  };

  const productInCartCurrent = state.productsInCart.find(
    (index) => index.product.title.trim() === title?.trim()
  );

  if (productInCartCurrent) productInCart = productInCartCurrent;

  let { product } = productInCart;

  const changeInputValue = (newValue: number) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  function minus() {
    dispatch({
      type: "MINUS_QUANTITY",
      data: { id: product.id },
    });

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });
  }

  function plus() {
    dispatch({
      type: "PLUS_QUANTITY",
      data: { id: product.id },
    });

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });
  }

  // Перенести в редьюсер
  function addToCart() {
    let index = 0;
    let productInCart = state.productsInCart.find((item, i) => {
      if (item.product.id === product.id) {
        index = i;
        return true;
      }
      return false;
    });

    if (productInCart) {
      productInCart.quantity = productInCart.quantity + 1;
      let addedCart = state.productsInCart;

      addedCart[index] = productInCart;

      dispatch({
        type: "ADD_TO_CART",
        data: { productsInCart: addedCart },
      });
    } else {
      let productsInCart = state.productsInCart;
      productInCart = {
        product: product,
        quantity: 1,
      };

      productsInCart.push(productInCart);

      dispatch({
        type: "ADD_TO_CART",
        data: { productsInCart: productsInCart },
      });
    }

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });
  }

  function getImageUrl(name: string) {
    return new URL(`../images/${name}`, import.meta.url).href;
  }

  return (
    <div id={"product-" + product.id} className="card">
      <div className="image">
        <img className="activator" src={getImageUrl(product.image_m)} alt="" />
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
            value={productInCart.quantity}
            onChange={(e) => changeInputValue(+e.target.value)}
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
            <span>{product.types}</span>
          </div>
          <div>
            <span>Объем:м </span>
            <span>{product.size} </span>
            <span>{product.types}</span>
          </div>
          <div>
            <span>Кол-во в коробке: </span>
            <span>{product.size} </span>
            <span>{product.types}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
