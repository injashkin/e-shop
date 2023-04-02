import logo from "../assets/logo-white.svg";
import chevron from "../assets/chevron.svg";
import download from "../assets/download-white.svg";
import whatsapp from "../assets/whatsapp.svg";
import telegram from "../assets/telegram.svg";
import visa from "../assets/visa.svg";
import masterCard from "../assets/master-card.svg";

import "./Footer.css";
import Search from "./Search";
import Button from "./Button";

export default function Footer() {
  return (
    <div className="footer-wrap">
      <footer className="footer container">
        <div className="footer__col1">
          <img src={logo}></img>
          <div>
            Компания «Султан» — снабжаем розничные магазины товарами "под ключ"
            в Кокчетаве и Акмолинской области
          </div>
          <div>Подпишись на скидки и акции</div>
          <Search
            text="Введите ваш E-mail"
            icon={chevron}
            className="footer__search"
          ></Search>
        </div>

        <div className="footer__group">
          <div className="footer__col2">
            <h3>Меню сайта:</h3>
            <nav>
              <li>О компании</li>
              <li>Доставка и оплата</li>
              <li>Возврат</li>
              <li>Контакты</li>
            </nav>
          </div>
          <div className="footer__col3">
            <h3>Категории:</h3>
            <nav>
              <li>Бытовая химия</li>
              <li>Косметика и гигиена</li>
              <li>Товары для дома</li>
              <li>Товары для детей и мам</li>
              <li>Посуда</li>
            </nav>
          </div>
        </div>

        <div className="footer__group">
          <div className="footer__col4">
            <h3>Скачать прайс-лист:</h3>
            <Button
              text="Прайс-лист"
              icon={download}
              name={""}
              className="footer__btn-download"
              onClick={(e) => (e)}
            ></Button>
            <div>Связь в мессенджерах:</div>
            <div>
              <a href="">
                <img src={whatsapp} />
              </a>
              <a href="">
                <img src={telegram} />
              </a>
            </div>
          </div>

          <div className="footer__col5">
            <h3>Контакты:</h3>
            <div>+7 (777) 490-00-91</div>
            <div>время работы: 9:00-20:00</div>
            <div>Заказать звонок</div>
            <div>
              opt.sultan@mail.ru
              <br />
              <span>На связи в любое время</span>
            </div>
            <div>
              <img src={visa}></img>
              <img src={masterCard}></img>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
