import { useContext } from "react";
import { AppContext } from "../App";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import "./cart.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IProductInCart } from "../globalTypes";

interface ICart {
  products: IProductInCart;
}

export default function Cart({ products }: ICart) {
  const { state, dispatch } = useContext(AppContext);

  const { product, quantity } = products;

  const handleChange = (value: number) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      data: { id: product.id, quantity: value },
    });
  };

  function remove() {
    dispatch({
      type: "REMOVE",
      data: { id: product.id },
    });

    dataUpdate();
  }

  function minus(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch({
      type: "MINUS_QUANTITY",
      data: { barcode: product.barcode },
    });

    dataUpdate();
  }

  function plus(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    dispatch({
      type: "PLUS_QUANTITY",
      data: { barcode: product.barcode },
    });

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

  return (
    <div id={`product-${product.barcode}`} className="cart">
      <div className="flex">
        <div className="cart__image">
          <div>
            <img
              className="cart__img"
              src={getImageUrl(product.image_m)}
              alt=""
            />
          </div>
        </div>
        <div className="cart__description">
          <div className="cart__unit">
            <img src={boxOpen} />
            <span>
              {product.size}
              {product.unit}
            </span>
          </div>
          <Link
            to={`/catalog/${product.title}`}
            onClick={() =>
              dispatch({ type: "SELECT", data: { barcode: product.barcode } })
            }
          >
            <h3>
              <span>{product.brand} </span>
              {product.name}
            </h3>
          </Link>

          <p>{product.description}</p>
        </div>
      </div>

      <div className="cart__control">
        <div className="sep49"></div>
        <div className="cart__inc-dec">
          <Button
            text="-"
            className="cart__minus"
            onClick={(e) => minus(e)}
          />
          <input
            type="text"
            id="card-quantity"
            name="quantity"
            className="quantity"
            value={quantity}
            onChange={(e) => handleChange(+e.target.value)}
          ></input>
          <Button
            text="+"
            className="cart__plus"
            onClick={(e) => plus(e)}
          />
        </div>
        <div className="sep49"></div>
        <div className="cart__price">{`${product.price} ₸`}</div>
        <div className="sep49"></div>

        <Button
          icon={deleted}
          className="cart__plus"
          onClick={remove}
        />
      </div>
    </div>
  );
}
