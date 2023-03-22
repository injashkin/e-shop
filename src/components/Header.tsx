import React, { useContext } from "react";
import { AppContext } from "../App";
import { useState } from "react";

import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import logo from "../assets/logo.svg";
import frame from "../assets/frame.svg";
import search from "../assets/search.svg";
import basketBlack from "../assets/basket-black.svg";
import inTouch from "../assets/in-touch.svg";
import downloadWhite from "../assets/download-white.svg";
import line from "../assets/line.svg";
import manager from "../assets/manager.png";
import "./Header.css";
import Button from "./Button";
import Search from "./Search";

export default function Header() {
  const [count2, setCount] = useState(3);
  const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  let asd = state.numProducts;
  //setCount(() => count2 + state.numProducts) // не работает

  return (
    <header className="header">
      <div className="header__top container">
        <div className="header__contacts">
          <div className="header__address">
            <img src={location}></img>
            <div className="header__address-main">
              г. Кокчетав, ул. Ж. Ташенова 129Б
              <div>(Рынок Восточный)</div>
            </div>
          </div>
          <div className="header__mail">
            <img src={mail}></img>
            <div className="header__mail-main">
              opt.sultan@mail.ru
              <div>На связи в любое время</div>
            </div>
          </div>
        </div>
        <nav className="header__menu">
          <li>
            <a href="#">О компании</a>
          </li>
          <li>
            <a href="#">Доставка и оплата</a>
          </li>
          <li>
            <a href="#">Возврат</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </nav>
      </div>
      <img className="line" src={line} />
      <div className="header__bottom container">
        <img src={logo} />
        <Button
          className="btn header__catalog"
          text="Каталог"
          icon={frame}
          id="header-catalog"
          name="catalog"
        />
        <Search parentClass="header" text="Поиск..." icon={search}></Search>

        <div className="header__callback-wrap">
          <div className="header__callback">
            <div className="header__phone">+7 (777) 490-00-91</div>
            <div className="header__work-time">время работы: 9:00-20:00</div>
            <div className="header__call">Заказать звонок</div>
          </div>

          <div className="header__manager">
            <img src={manager} />
            <img src={inTouch} />
          </div>
        </div>

        <Button
          className="btn header__price-list"
          text="Прайс-лист"
          icon={downloadWhite}
          id="header-price-list"
          name="price-list"
        />

        <div className="header__basket">
          <div className="header-basket">
            <img src={basketBlack} />
            <div className="header-basket__num">{state.numProducts}</div>
          </div>
          <div className="header__basket-text">
            <div>Корзина</div>
            <div className="header__basket-sum">{`${state.basketSum} ₸`}</div>
          </div>
        </div>
      </div>
      <img className="line" src={line} />
    </header>
  );
}
