import { useContext } from "react";
import { AppContext } from "../App";
import imgProduct from "../images/biomio-sm.png";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import basket from "../assets/basket.svg";
import "./BasketCard.css";
import Button from "./Button";

export interface ShopCardProps {
  id?: string;
  name?: string;
  price?: number;
  images?: string;
  brand?: string;
  article?: number;
  manufacturer?: string;
  description?: string;
  size?: number;
  type?: string;
  barcode?: number;
}

let priceTest = 48.76;

export default function BasketCard(props: ShopCardProps) {
  // Карточка товара для корзины

  const {
    id,
    name,
    price,
    images,
    brand = "AOS",
    article,
    manufacturer = "Нэфис",
    description,
    size,
    type,
    barcode = 4604049097548,
  } = props;

  const { state, dispatch } = useContext(AppContext);

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

  let mod = "cat";

  let cat = true;
  let catMob = false;
  let col = false;
  let row = false;

  let colClass = "";
  let basketCard = "basket-card";
  let basketCardPrice = "basket-card__price";
  let basketCardControl = "basket-card__control";
  let basketCardImage = "basket-card__image";

  if (mod === "row") {
    row = true;
    col = false;
    cat = false;
  }

  if (mod === "col") {
    col = true;
    cat = false;
    row = false;
    basketCard = `${basketCard} basket-card--col`;
    basketCardImage = `${basketCardImage} basket-card__image--col`;
    colClass = " col";
    basketCardPrice = `${basketCardPrice} basket-card__price--sm`;
    basketCardControl = `${basketCardControl} basket-card__control--col`;
  }
  if (mod === "cat") {
    cat = true;
    col = false;
    row = false;
    basketCard = `${basketCard} basket-card--cat`;
    basketCardImage = `${basketCardImage} basket-card__image--cat`;
    colClass = " col";
    basketCardPrice = `${basketCardPrice} basket-card__price--sm`;
    basketCardControl = `${basketCardControl} basket-card__control--cat`;
  }

  if(mod === "cat-mob") {
    catMob = true;
    cat = true;
    col = false;
    row = false;
    basketCard = `${basketCard} basket-card--cat basket-card--cat-mob`;
    basketCardImage = `${basketCardImage} basket-card__image--cat basket-card__image--cat-mob`;
    colClass = " col";
    basketCardPrice = `${basketCardPrice} basket-card__price--sm`;
    basketCardControl = `${basketCardControl} basket-card__control--cat`;
  }

  return (
    <div className={basketCard}>
      <div className={`flex ${colClass}`}>
        {catMob && (<div className="basket-card__pop">ПОПУЛЯРНОЕ</div>)}
        <div className={basketCardImage}>
          <img className="activator" src={imgProduct} alt="" />
        </div>
        <div className="basket-card__description">
          
          <div className="basket-card__unit">
            <img src={boxOpen}></img>
            <span>90г</span>
          </div>
          <h3><span>BioMio BIO-SOAP </span>{props.name}</h3>

          {cat && (
            <div className="basket-card__detail">
              <div>
                <span>Штрихкод: </span>
                <span>{barcode}</span>
              </div>
              <div>
                <span>Производитель: </span>
                <span>{manufacturer}</span>
              </div>
              <div>
                <span>Бренд: </span>
                <span>{brand}</span>
              </div>
            </div>
          )}

          {(col || row) && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              interdum ut justo, vestibulum sagittis iaculis iaculis. Quis
              mattis vulputate feugiat massa vestibulum duis.{" "}
            </p>
          )}
        </div>
      </div>

      <div className={`${basketCardControl}`}>
        {row && <div className="sep49"></div>}
        {(row || col) && (
          <div className="basket-card__inc-dec">
            <Button text="-" className="basket-card__minus" onClick={minus} />

            <input
              type="text"
              id="card-quantity"
              name="quantity"
              className="quantity"
              value={state.quantityFromCard}
              onChange={(e) => changeInputValue(e.target.value)}
            ></input>

            <Button text="+" className="basket-card__plus" onClick={plus} />
          </div>
        )}

        {(row || col) && <div className="sep49"></div>}
        <div className={basketCardPrice}>{`${priceTest} ₸`}</div>
        {(row || col) && <div className="sep49"></div>}
        {(row || col) && <Button icon={deleted} className="basket-card__plus" />}
        {cat && (
          <Button
            text="В корзину"
            icon={basket}
            className="basket-card__plus"
          />
        )}
      </div>
    </div>
  );
}
