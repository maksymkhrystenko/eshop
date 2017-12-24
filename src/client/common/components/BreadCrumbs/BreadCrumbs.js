import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

export default class BreadCrumbs extends Component {

  constructor(props) {
    super(props);
    //faker.locale = "ru";

    let product = {
      category: "Товары",
    };
    this.state = product;

  }

  render() {
    const {category} = this.state;
    return (
      <div className="breadсrumbs-block">
        <div className="breadсrumbs">
          <Link to="/admin">Админ панель</Link>
          <Link to="/admin/products">{category}</Link>
        </div>
        <div className="actions">
          <Link to="/admin/products">Назад</Link>
        </div>
      </div>
    );
  }
}
