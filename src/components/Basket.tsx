import "./Basket.css";
import { MouseEvent, useContext } from "react";
import { AppContext } from "../App";
import { IProductInCart } from "../globalTypes";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import Button from "./Button";
import doubleCheck from "../assets/double-check.svg";

let modalHeader = "";
let modalText = "";

export default function Basket() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const closeModal = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    let modalEl = document.querySelector(".modal") as HTMLElement;
    if (modalEl.style.display === "block") {
      modalEl.style.display = "none";
    }

    navigate("/catalog");
  };

  const openModal = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
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

    let modal = document.querySelector(".modal") as HTMLElement;
    modal.style.display = "block";
  };

  return (
    <div>
      <Modal
        closeModal={(e) => closeModal(e)}
        title={modalHeader}
        text={modalText}
      >
        <Button icon={doubleCheck} onClick={(e) => e} />
      </Modal>
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
