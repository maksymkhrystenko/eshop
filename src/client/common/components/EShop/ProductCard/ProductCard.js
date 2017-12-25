import React, {Component} from 'react';
import {Icon, Card} from 'antd';
import i18next from 'i18next';

import {Col, Row, Label, Link, Button} from '../../../components';
import styles from './styles.scss';


export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.product.price,
      name: this.props.product.name,
      shortDescription: this.props.product.shortDescription,
      imageUrl: this.props.product.imageUrl,
      uid: this.props.product.uid,
    };
  }

  render() {
    const {price, name, imageUrl, shortDescription, uid} = this.state;
    let list = true;
    return (<Card
        hoverable
        className={styles.ProductCard}
      >
        <Row>
          <img src={imageUrl} alt=""/>
          <Col span={14} className={styles.RateBlock}>
            <Icon type="star"/>
            <Icon type="star"/>
            <Icon type="star"/>
            <Icon type="star"/>
            <Icon type="star"/>
          </Col>
          <Col span={10} className={styles.Feedbacks}>
            {'(0) '}{i18next.t('FEEDBACKS')}
          </Col>
        </Row>
        <Row>
          <Col className={styles.Info} span={24}>
            <Link className={styles.Title} to={`/product/test-category/${uid}`}>
              {name}
            </Link>
            <Col span={24} className={styles.DescriptionBlock}>{shortDescription}</Col>
            <Col className={styles.PriceBloack} span={12}>
              <span className={styles.Price}>{price} {i18next.t('CURRENCY')}</span>
              <Button size="small" type="primary">{i18next.t('TO_ORDER')}</Button>
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
