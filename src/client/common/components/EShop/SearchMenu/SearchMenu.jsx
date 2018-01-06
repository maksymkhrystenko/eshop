import React, { Component } from 'react';
import './styles.scss';

export default class SearchMenu extends Component {

  render() {
    return (
      <div className="search-menu">
        <div className="container display-flex">
          <ul className="menu-items">
            <li>{/*<i className="fa fa-info"></i>*/}<a href="#">О магазине</a></li>
            <li>{/*<i className="fa fa-truck"></i>*/}<a href="#">Доставка</a></li>
            <li>{/*<i className="fa fa-th-list"></i>*/}<a href="#">Список пожеланий</a></li>
            <li>{/*<i className="fa fa-shopping-cart" aria-hidden="true"></i>*/}<a href="#">Корзина</a></li>
            <li>{/*<i className="fa fa-user-circle"></i>*/}<a href="#">Личный кабинет</a></li>
          </ul>
          <div className="search-container">
            <input className="search-filed" placeholder="Поиск по сайту..." type="text"/>
            <button className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    );
  }
}
