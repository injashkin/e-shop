import React, { useContext } from "react";
import App, { AppContext } from "../App";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

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
import ButtonLink from "./ButtonLink";

export default function Header() {
  const [count2, setCount] = useState(3);
  const { state, dispatch } = useContext(AppContext);

  const changeInputValue = (newValue) => {
    dispatch({ type: "UPDATE_INPUT", data: newValue });
  };

  let asd = state.numProducts;

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
            <Link to="/">О компании</Link>
          </li>
          <li>
            <Link to="/">Доставка и оплата</Link>
          </li>
          <li>
            <Link to="/">Возврат</Link>
          </li>
          <li>
            <Link to="/">Контакты</Link>
          </li>
        </nav>
      </div>
      <img className="line" src={line} />
      <div className="header__bottom container">
        <Link to="/">
          <img src={logo} />
        </Link>

        <ButtonLink
          className="header__catalog-btn"
          text="Каталог"
          icon={frame}
          href="/catalog"
        />

        <Search className="header__search" icon={search}></Search>

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
          className="header__price-list"
          text="Прайс-лист"
          icon={downloadWhite}
          name="header-price-list"
        />

        <Link to="/basket" className="header__basket">
          <div className="header-basket">
            <img src={basketBlack} />
            <div className="header-basket__num">{state.numProducts}</div>
          </div>
          <div className="header__basket-text">
            <div>Корзина</div>
            <div className="header__basket-sum">{`${state.basketSum} ₸`}</div>
          </div>
        </Link>
      </div>
      <img className="line" src={line} />
    </header>
  );
}
