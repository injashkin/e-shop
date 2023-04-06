import { useContext } from "react";
import { AppContext } from "../App";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import "./ProductCard.css";
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
    <div id={`product-${product.barcode}`} className="product-card">
      <div className="flex">
        <div className="product-card__image">
          <div>
            <img
              className="product-card__img"
              src={getImageUrl(product.image_m)}
              alt=""
            />
          </div>
        </div>
        <div className="product-card__description">
          <div className="product-card__unit">
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

      <div className="product-card__control">
        <div className="sep49"></div>
        <div className="product-card__inc-dec">
          <Button
            text="-"
            className="product-card__minus"
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
            className="product-card__plus"
            onClick={(e) => plus(e)}
          />
        </div>
        <div className="sep49"></div>
        <div className="product-card__price">{`${product.price} ₸`}</div>
        <div className="sep49"></div>

        <Button
          icon={deleted}
          className="product-card__plus"
          onClick={remove}
        />
      </div>
    </div>
  );
}
