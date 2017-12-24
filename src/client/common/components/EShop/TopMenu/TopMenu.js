import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';
import * as noImg from '../../../images/no-avatar.png';

export default class MainMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <div className="container display-flex">
          <Link className="logo-link" to={'/'}>
            <div className="logo"></div>
          </Link>
          <ul className="menu-items">
            <li><Link className="product-card-title" to={`/`}>
              О SKILLS
            </Link>
            </li>
            <li>
              <Link className="product-card-title" to={`/products`}>
                Все Курсы
              </Link>
            </li>
            <li>{/*<i className="fa fa-book"></i>*/}
              <Link className="product-card-title" to={`/blog`}>
                Новости
              </Link>
            </li>
            <li>
              <Link className="product-card-title" to={`/`}>
                Отзывы
              </Link>
            </li>
            <li>
              <Link className="product-card-title" to={`/admin`}>
                ADMIN
              </Link>
            </li>
          </ul>
          <div className="support-container">
            <div className="support-image"></div>
            <div className="contacts">
              <span>+38 (093) 453 44 53</span>
              <span>+38 (067) 763 42 86</span>
              {/*<a href="mailto:maxmos.dp.ua@gmail.com">service@skills.com.ua</a>*/}
            </div>
            <div className="main-activities-container">
              <i className="fa fa-shopping-cart cart" aria-hidden="true"></i><a href="#">Корзина</a>
            </div>
            <div className="main-activities-container">
              <img className="avatar" src={noImg} alt=""/><a href="#">Мой кабинет</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
