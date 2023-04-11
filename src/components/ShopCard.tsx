import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import "./ShopCard.css";
import basket from "../assets/basket.svg";
import download from "../assets/download.svg";
import dotLine from "../assets/dot-line.svg";
import share from "../assets/share.svg";
import Button from "./Button/Button";
import { useParams } from "react-router-dom";
import { IProductInCart } from "../globalTypes";
import Counter from "./Counter/Counter";

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

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "UPDATE_INPUT", data: e.target.value });
  };

  function minus() {
    dispatch({
      type: "MINUS_QUANTITY",
      data: { barcode: product.barcode },
    });

    dataUpdate();
  }

  function plus() {
    dispatch({
      type: "PLUS_QUANTITY",
      data: { barcode: product.barcode },
    });

    dataUpdate();
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

    dataUpdate();
  }

  function dataUpdate() {
    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });
  }

  function getImageUrl(name: string) {
    return new URL(`../images/${name}`, import.meta.url).href;
  }

  useEffect(() => {
    document.title = title as string;
  }, []);

  return (
    <div id={"product-" + product.id} className="card">
      <div className="card__image">
        <div>
          <img
            className="activator"
            src={getImageUrl(product.image_m)}
            alt=""
          />
        </div>
      </div>
      <div className="card__right-side">
        <div className="card__availability">В наличии</div>
        <header className="card__header">
          <span>{product.brand} </span>
          <span>{product.name}</span>
        </header>

        <div>
          <span>{product.size} </span>
          <span>{product.unit}</span>
        </div>

        <div className="card__form">
          <div className="card__control-group">
            <div className="card__price">
              <span>{`${product.price}₸`}</span>
            </div>

            <Counter
              quantity={productInCart.quantity}
              changeValue={changeInputValue}
              minus={minus}
              plus={plus}
            />
          </div>

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

        <img className="card__separator" src={dotLine}></img>

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
            <span>{product.unit}</span>
          </div>
          <div>
            <span>Объем:м </span>
            <span>{product.size} </span>
            <span>{product.unit}</span>
          </div>
          <div>
            <span>Кол-во в коробке: </span>
            <span>{product.size} </span>
            <span>{product.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
