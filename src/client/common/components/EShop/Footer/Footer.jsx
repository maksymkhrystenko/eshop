import React, { Component } from 'react';
import './styles.scss';

export default class Footer extends Component {
  componentDidMount() {
 /*   $(document).ready(function () {
      $("#to-top-button").click(function () {
        $("html").animate({scrollTop: 0}, '500', 'swing', function () {
        });
      });
    });*/
  }

  render() {
    return (
      <div className="footer">
        <div className="contacts-block">
          <div className="container position-relative">
            <div id="to-top-button"><i className="fa fa-chevron-up" aria-hidden="true"></i></div>
            <div className="row">
              <div className="col-md-4">
                <a className="logo-link" href="/">
                  <div className="logo"></div>
                </a>
                <div className="support-container">
                  <div className="supportimage"></div>
                  <div className="contacts">
                    <span>+38 (093) 453 44 53</span>
                    <span>+38 (067) 763 42 86</span>
                    <a href="mailto:maxmos.dp.ua@gmail.com">maxmos.dp.ua@gmail.com</a>
                  </div>
                </div>
                <div className="address-container">
                  <h5>Наш адрес:</h5>
                  <p>Будем рады видеть Вас по адресу:<br/>
                    г. Киев, ул. Ярославская,57,<br/>
                    Подробнее: <a href="mailto:info@maxmos.dp.ua">info@maxmos.dp.ua</a>
                  </p>
                </div>
                <ul className="social-icons-container">
                  <li><a className="fa fa-facebook" href="#"></a></li>
                  <li><a className="fa fa-twitter" href="#"></a></li>
                  <li><a className="fa fa-pinterest" href="#"></a></li>
                  <li><a className="fa fa-linkedin" href="#"></a></li>
                  <li><a className="fa fa-google-plus" href="#"></a></li>
                  <li><a className="fa fa-tumblr" href="#"></a></li>
                  <li><a className="fa fa-instagram" href="#"></a></li>
                  <li><a className="fa fa-youtube" href="#"></a></li>
                  <li><a className="fa fa-rss" href="#"></a></li>
                </ul>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-4">
                    <div className="footer-menu-container">
                      <h5 className="footer-menu-caption-container">Информация</h5>
                      <ul className="footer-menu-list-container">
                        <li><a href="#">О нас</a></li>
                        <li><a href="#">Как мы работаем</a></li>
                        <li><a href="#">Сотрудничество</a></li>
                        <li><a href="#">Поставщики</a></li>
                        <li><a href="#">Услуги</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="footer-menu-container">
                      <h5 className="footer-menu-caption-container">Клиентский сервис</h5>
                      <ul className="footer-menu-list-container">
                        <li><a href="#">Связаться с нами</a></li>
                        <li><a href="#">Карта сайта</a></li>
                        <li><a href="#">Специальное</a></li>
                        <li><a href="#">Бренды</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="footer-menu-container">
                      <h5 className="footer-menu-caption-container">Мой аккаунт</h5>
                      <ul className="footer-menu-list-container">
                        <li><a href="#">Мой кабинет</a></li>
                        <li><a href="#">Список желаний</a></li>
                        <li><a href="#">Сообщения</a></li>
                        <li><a href="#">Отследить статус заказа</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyrights-block">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="copyrights">© Skills - All Rights Reserved. 2017</div>
              </div>
              <div className="col-md-8">
                <ul className="menu-items">
                  <li><i className="fa fa-info"></i><a href="#">О магазине</a></li>
                  <li><i className="fa fa-truck"></i><a href="#">Доставка</a></li>
                  <li><i className="fa fa-th-list"></i><a href="#">Список пожеланий</a></li>
                  <li><i className="fa fa-shopping-cart" aria-hidden="true"></i><a href="#">Корзина</a></li>
                  <li><i className="fa fa-user-circle"></i><a href="#">Личный кабинет</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
