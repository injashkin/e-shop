import location from "../assets/location.svg";
import mail from "../assets/mail.svg";
import logo from "../assets/logo.svg";
import frame from "../assets/frame.svg";
import search from "../assets/search.svg";
import basketBlack from "../assets/basket-black.svg";
import round from "../assets/round.svg";
import inTouch from "../assets/in-touch.svg";
import downloadWhite from "../assets/download-white.svg";
import manager from "../assets/manager.png";
import "./Header.css";
import Button from "./Button";
import Search from "./Search";

export default function Header() {
  return (
    <header>
      <div className="header__top">
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
              opt.sultan@mail.ru<div>На связи в любое время</div>
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
      <div className="header__bottom">
        <img src={logo} />
        <Button
          className="btn header__catalog"
          text="Каталог"
          icon={frame}
          id="header-catalog"
          name="catalog"
        />
        <Search
          className="header__search"
          text="Поиск..."
          id="header-search"
          icon={search}
          name="search"
        ></Search>

        <div className="header__callback">
          <div className="header__phone">+7 (777) 490-00-91</div>
          <div className="header__work-time">время работы: 9:00-20:00</div>
          <div className="header__call">Заказать звонок</div>
        </div>
        <img src={manager} />
        <img src={inTouch} />
        <Button
          className="btn header__price-list"
          text="Прайс-лист"
          icon={downloadWhite}
          id="header-price-list"
          name="price-list"
        />

        <div className="header__basket">
          <img src={basketBlack} />
          <img src={round} />
          <div>3</div>
          <div>Корзина</div>
          <div className="header__basket-sum">{`12 478 ₸`}</div>
        </div>
      </div>
    </header>
  );
}
