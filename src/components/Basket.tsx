import "./Basket.css";
import Button from "./Button";
import { MouseEvent, useContext } from "react";
import { AppContext } from "../App";
import { IProductInCart } from "../globalTypes";
import Cart from "./Cart";
import doubleCheck from "../assets/double-check.svg";
import close from "../assets/close.svg";
import { useNavigate } from "react-router-dom";

let modalHeader = "";
let modalText = "";

export default function Basket() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const closeModal = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    let modal = document.querySelector(".basket__modal-wrap") as HTMLElement;
    if (modal.style.display === "block") {
      modal.style.display = "none";
    }

    navigate("/catalog");
  };

  const openModal = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    console.log(state.numProducts);
    if (state.numProducts) {
      modalHeader = "Спасибо за заказ";
      modalText = "Наш менеджер свяжется с вами в ближайшее время";
    } else {
      modalHeader = "У вас нет заказов";
      modalText = "Вы можете выбрать нужный товар в каталоге";
    }

    dispatch({
      type: "CLEAR_CART",
      data: "",
    });

    let modal = document.querySelector(".basket__modal-wrap") as HTMLElement;
    modal.style.display = "block";
  };

  return (
    <div>
      <div className="basket__modal-wrap" onClick={(e) => closeModal(e)}>
        <div className="basket__modal">
          <img className="basket__modal-close" src={close} />
          <Button icon={doubleCheck} onClick={(e) => e} />
          <div className="basket__modal-header">{modalHeader}</div>
          <p className="basket__modal-text">{modalText}</p>
        </div>
      </div>
      <div className="basket container">
        <div className="basket__bread-crumbs">
          <div>Главная</div>
          <div className="separator"></div>
          <div>Корзина</div>
        </div>

        <h1>Корзинa</h1>

        {state.productsInCart.map((product: IProductInCart) => (
          <Cart key={product.product.id} products={product} />
        ))}

        <div className="basket__bottom">
          <Button
            text="Оформить заказ"
            className="basket__make-order"
            onClick={(e) => openModal(e)}
          ></Button>
          <div className="basket__sum">{state.totalSum} ₸</div>
        </div>
      </div>
    </div>
  );
}
