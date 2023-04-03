import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import basket from "../assets/basket.svg";
import "./ProductCard.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IProduct } from "../globalTypes";

export type Mod = "row" | "col" | "cat" | "cat-mob";

interface IProductCard {
  mod: Mod;
  product: IProduct;
}

export default function ProductCard({ mod, product }: IProductCard) {
  const {
    id,
    title,
    name,
    price,
    image_m,
    brand = "AOS",
    article,
    manufacturer = "Нэфис",
    description,
    size,
    types,
    barcode = 4604049097548,
    quantity = 1,
  } = product;

  const { state, dispatch } = useContext(AppContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE_QUANTITY",
      data: { id: id, quantity: +e.target.value },
    });
  };

  function remove() {
    dispatch({
      type: "REMOVE",
      data: { id: id },
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });
  }

  function minus() {
    dispatch({
      type: "MINUS_QUANTITY",
      data: { id: id },
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });
  }

  function plus() {
    dispatch({
      type: "PLUS_QUANTITY",
      data: { id: id },
    });

    dispatch({
      type: "UPDATE_NUM",
      data: state.numProducts + state.quantityFromCard,
    });

    dispatch({
      type: "UPDATE_SUM",
      data: "",
    });
  }

  // Перенести в редьюсер
  function addToCart() {
    let index: number = -1;
    console.log("index1", index);

    let productInCart = state.productsInCart.find((item, i) => {
      if (item.id === product.id) {
        index = i;
        console.log("index2", index);
        return true;
      }
      return false;
    });

    if (productInCart) {
      console.log("KKKKKKKKKKKKKKKKKKKK", productInCart.quantity)

      productInCart.quantity = productInCart.quantity + 1;
      let productsInCart = state.productsInCart;

      console.log("index3", index);
      productsInCart[index + 1] = productInCart;

      dispatch({
        type: "ADD_TO_CART",
        data: { productsInCart: productsInCart },
      });
    } else {
      product.quantity = 1;
      let productsInCart = state.productsInCart;
      productsInCart[0] = product;

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

  let cat = true;
  let catMob = false;
  let col = false;
  let row = false;

  let colClass = "";
  let productCard = "product-card";
  let productCardPrice = "product-card__price";
  let productCardControl = "product-card__control";
  let productCardImage = "product-card__image";

  if (mod === "row") {
    row = true;
    col = false;
    cat = false;
  }

  if (mod === "col") {
    col = true;
    cat = false;
    row = false;
    productCard = `${productCard} product-card--col`;
    productCardImage = `${productCardImage} product-card__image--col`;
    colClass = " col";
    productCardPrice = `${productCardPrice} product-card__price--sm`;
    productCardControl = `${productCardControl} product-card__control--col`;
  }
  if (mod === "cat") {
    cat = true;
    col = false;
    row = false;
    productCard = `${productCard} product-card--cat`;
    productCardImage = `${productCardImage} product-card__image--cat`;
    colClass = " col";
    productCardPrice = `${productCardPrice} product-card__price--sm`;
    productCardControl = `${productCardControl} product-card__control--cat`;
  }

  if (mod === "cat-mob") {
    catMob = true;
    cat = true;
    col = false;
    row = false;
    productCard = `${productCard} product-card--cat product-card--cat-mob`;
    productCardImage = `${productCardImage} product-card__image--cat product-card__image--cat-mob`;
    colClass = " col";
    productCardPrice = `${productCardPrice} product-card__price--sm`;
    productCardControl = `${productCardControl} product-card__control--cat`;
  }

  function getImageUrl(name: string) {
    return new URL(`../images/${name}`, import.meta.url).href;
  }

  return (
    <div id={id} className={productCard}>
      <div className={`flex ${colClass}`}>
        {catMob && <div className="product-card__pop">ПОПУЛЯРНОЕ</div>}
        <div className={productCardImage}>
          <img className="activator" src={getImageUrl(image_m)} alt="" />
        </div>
        <div className="product-card__description">
          <div className="product-card__unit">
            <img src={boxOpen} />
            <span>
              {size}
              {types}
            </span>
          </div>
          <Link to={`/catalog/${title}`}>
            <h3>
              <span>{brand} </span>
              {name}
            </h3>
          </Link>

          {cat && (
            <div className="product-card__detail">
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

          {(col || row) && <p>{description}</p>}
        </div>
      </div>

      <div className={`${productCardControl}`}>
        {row && <div className="sep49"></div>}
        {(row || col) && (
          <div className="product-card__inc-dec">
            <Button text="-" className="product-card__minus" onClick={minus} />

            <input
              type="text"
              id="card-quantity"
              name="quantity"
              className="quantity"
              value={product.quantity}
              onChange={(e) => handleChange(e)}
            ></input>

            <Button text="+" className="product-card__plus" onClick={plus} />
          </div>
        )}

        {(row || col) && <div className="sep49"></div>}
        <div className={productCardPrice}>{`${price} ₸`}</div>
        {(row || col) && <div className="sep49"></div>}
        {(row || col) && (
          <Button
            icon={deleted}
            className="product-card__plus"
            onClick={remove}
          />
        )}
        {cat && (
          <Button
            text="В корзину"
            icon={basket}
            className="product-card__plus"
            onClick={addToCart}
          />
        )}
      </div>
    </div>
  );
}
