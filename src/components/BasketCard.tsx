import { useContext } from "react";
import { AppContext } from "../App";
import imgProduct from "../images/biomio-sm.png";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import "./BasketCard.css";
import Button from "./Button";

export interface ShopCardProps {
  id: string;
  name: string;
  price: number;
  images: string;
  brand: string;
  article: number;
  manufacturer: string;
  description: string;
  size: number;
  type: string;
}

let priceTest = 48.76;

export default function BasketCard(props: ShopCardProps) {
  // Карточка товара для корзины

  const {
    id,
    name,
    price,
    images,
    brand,
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

  function minus(e) {
    if (state.quantityFromCard > 0)
      changeInputValue(state.quantityFromCard - 1);
  }

  function plus(e) {
    changeInputValue(state.quantityFromCard + 1);
  }

  return (
    <div className="basket-card">
      <div className="image">
        <img className="activator" src={imgProduct} alt="" />
      </div>
      <div className="basket-card__description">
        <div className="basket-card__unit">
          <img src={boxOpen}></img>
          <span>90г</span>
        </div>
        <h3>BioMio BIO-SOAP Экологичное туалетное мыло....</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          interdum ut justo, vestibulum sagittis iaculis iaculis. Quis mattis
          vulputate feugiat massa vestibulum duis.{" "}
        </p>
      </div>

      <div className="basket-card__control">
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
      <div className="basket-card__price">{`${priceTest} ₸`}</div>
      <Button icon={deleted} className="basket-card__plus" />
    </div>
  );
}
