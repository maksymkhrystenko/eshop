import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

function onClick() {
}


export default class SidebarMenu extends Component {
  render() {
    return (
      <div className="sidebar-menu">
        <div onClick={onClick} className="menu-caption"></div>
        <div className="search-container">
          <input className="search-filed" placeholder="Начните ввод курса..." type="text"/>
          <button className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <ul className="menu-items">
          <Link to={'/about'}>
            <li>Кто такие SKILLS</li>
          </Link>
          <Link to={'/list-of-wishes'}>
            <li>Список пожеланий</li>
          </Link>
          <Link to={'/cart'}>
            <li>Корзина</li>
          </Link>
          <Link
            to={`/user/${typeof(window) !== 'undefined' && window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).uid : ':uid'}`}>
            <li>Личный кабинет</li>
          </Link>
          <Link to={'/admin/blog'}>
            <li>Статьи</li>
          </Link>
          <Link to={'/products'}>
            <li>Курсы</li>
          </Link>
          <Link to={'/categories'}>
            <li>Категории курсов</li>
          </Link>
        </ul>
      </div>
    );
  }
}
