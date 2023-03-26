import { useContext } from "react";
import { AppContext } from "../App";
import boxOpen from "../assets/box-open.svg";
import deleted from "../assets/deleted.svg";
import basket from "../assets/basket.svg";
import "./ProductCard.css";
import Button from "./Button";
import { IProduct } from "../globalTypes";
import { Link } from "react-router-dom";

//export interface ShopCardProps {
//  mod: string;
//  product: IProduct;
//}

//const Product: React.FC<ShopCardProps> = ({product}): JSX.Element => {
const ProductCard = ({ mod, ...product }): JSX.Element => {
  const {
    id,
    title,
    name,
    price,
    image,
    image_m,
    brand = "AOS",
    article,
    manufacturer = "Нэфис",
    description,
    size,
    type,
    barcode = 4604049097548,
  } = product;

  const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
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
      data: (state.productsInCart = [...state.productsInCart, product]),
    });
  };

  function minus() {
    if (state.quantityFromCard > 0)
      changeInputValue(state.quantityFromCard - 1);
  }

  function plus() {
    changeInputValue(state.quantityFromCard + 1);
  }

  function addToCart() {
    dispatch({
      type: "ADD_TO_CART",
      data: (state.productsInCart = [...state.productsInCart, product]),
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

  function getImageUrl(name) {
    return new URL(`../images/${name}`, import.meta.url).href;
  }

  return (
    <div className={productCard}>
      <div className={`flex ${colClass}`}>
        {catMob && <div className="product-card__pop">ПОПУЛЯРНОЕ</div>}
        <div className={productCardImage}>
          <img className="activator" src={getImageUrl(image_m)} alt="" />
        </div>
        <div className="product-card__description">
          <div className="product-card__unit">
            <img src={boxOpen}></img>
            <span>90г</span>
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
              value={state.quantityFromCard}
              onChange={(e) => changeInputValue(e.target.value)}
            ></input>

            <Button text="+" className="product-card__plus" onClick={plus} />
          </div>
        )}

        {(row || col) && <div className="sep49"></div>}
        <div className={productCardPrice}>{`${price} ₸`}</div>
        {(row || col) && <div className="sep49"></div>}
        {(row || col) && (
          <Button icon={deleted} className="product-card__plus" />
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
};

export default ProductCard;
