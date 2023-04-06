import { useContext } from "react";
import { AppContext } from "../App";
import boxOpen from "../assets/box-open.svg";
import basket from "../assets/basket.svg";
import "./ProductCard.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { IProduct, IProductInCart } from "../globalTypes";

export type Mod = "cat" | "cat-mob";

interface IProductCard {
  mod: Mod;
  product: IProduct;
}

export default function ProductCard({ mod, product }: IProductCard) {
  const { state, dispatch } = useContext(AppContext);

  let productInCart: IProductInCart | undefined = {
    product: product,
    quantity: +product.id,
  };

  // Перенести в редьюсер
  function addToCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    let index = 0;

    productInCart = state.productsInCart.find((item, i) => {
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
      type: "UPDATE_SUM",
      data: "",
    });

    dispatch({
      type: "UPDATE_TOTAL_NUM",
      data: "",
    });
  }

  let cat = true;
  let catMob = false;

  let colClass = "";
  let productCard = "product-card";
  let productCardPrice = "product-card__price";
  let productCardControl = "product-card__control";
  let productCardImage = "product-card__image";


  if (mod === "cat") {
    cat = true;
    productCard = `${productCard} product-card--cat`;
    productCardImage = `${productCardImage} product-card__image--cat`;
    colClass = " col";
    productCardPrice = `${productCardPrice} product-card__price--sm`;
    productCardControl = `${productCardControl} product-card__control--cat`;
  }

  if (mod === "cat-mob") {
    catMob = true;
    cat = true;
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
    <div id={`product-${product.barcode}`} className={productCard}>
      <div className={`flex ${colClass}`}>
        {catMob && <div className="product-card__pop">ПОПУЛЯРНОЕ</div>}

        <div className={productCardImage}>
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

          <div className="product-card__detail">
            <div>
              <span>Штрихкод: </span>
              <span>{product.barcode}</span>
            </div>
            <div>
              <span>Производитель: </span>
              <span>{product.manufacturer}</span>
            </div>
            <div>
              <span>Бренд: </span>
              <span>{product.brand}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${productCardControl}`}>
        <div className={productCardPrice}>{`${product.price} ₸`}</div>

        <Button
          text="В корзину"
          icon={basket}
          className="product-card__plus"
          onClick={(e) => addToCart(e)}
        />
      </div>
    </div>
  );
}
