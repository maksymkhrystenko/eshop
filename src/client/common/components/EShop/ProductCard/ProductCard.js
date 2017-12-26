import React, {Component} from 'react';
import {Icon, Card} from 'antd';
import i18next from 'i18next';

import {Col, Row, Link, Rates} from '../../../components';
import Price from '../../../components/EShop/Price';
import styles from './styles.scss';


export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.product.price,
      name: this.props.product.name,
      shortDescription: this.props.product.shortDescription,
      imageUrl: this.props.product.imageUrl,
      id: this.props.product.id,
      countOfProductsPerRow: this.props.countOfProductsPerRow,
    };
  }

  render() {
    const {price, name, imageUrl, shortDescription, id, countOfProductsPerRow} = this.state;
    let list = true;
    return (<Card
        hoverable
        className={styles.ProductCard}
        style={{width: `${100 / countOfProductsPerRow}%`}}
      >
        <Row>
          <img src={imageUrl} alt=""/>
          <Col>
            <Rates/>
          </Col>
        </Row>
        <Row>
          <Col className={styles.Info} span={24}>
            <Link className={styles.Title} to={`product-card/${id}`}>
              {name}
            </Link>
            <Col span={24} className={styles.DescriptionBlock}>{shortDescription}</Col>
            <Col className={styles.PriceBloack} span={12}>
              <Price price={455}/>
              <Link to={'product-card/8'} className="ant-btn ant-btn-primary ant-small">{i18next.t('TO_ORDER')}</Link>
            </Col>
            <Col span={6}>
              <Link to={'#'}>
                <Icon type="switcher"/>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={'#'}>
                <Icon type="heart-o"/>
              </Link>
            </Col>
          </Col>
        </Row>
      </Card>
    );
  }
}
