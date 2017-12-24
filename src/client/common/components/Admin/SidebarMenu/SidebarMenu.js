import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

export default class SidebarMenu extends Component {
  render() {
    return (
      <div className="sidebar-menu">
        <div className="menu-caption"></div>
        <ul className="menu-items">
          <Link to={'/admin/articles'}>
            <li>Блог</li>
          </Link>
          <Link to={'/admin/products'}>
            <li>Курсы</li>
          </Link>
          <Link to={'/admin/categories'}>
            <li>Категории</li>
          </Link>
          <Link to={'/admin/units'}>
            <li>Единицы измерения</li>
          </Link>
          <Link to={'/admin/dimensions'}>
            <li>Размерности</li>
          </Link>
          <Link to={'/admin/product-properties'}>
            <li>Свойства товаров</li>
          </Link>
          <Link to={'/admin/product-property-sets'}>
            <li>Наборы свойств товаров</li>
          </Link>
        </ul>
      </div>
    );
  }
}
