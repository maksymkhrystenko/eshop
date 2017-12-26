import React from 'react';
import PropTypes from 'prop-types';

import {Col, Row} from '../../../components';
import styles from './styles.scss';
import i18next from "i18next";

const Price = ({price, oldPrice, children, ...props}) => {
  return (<Row type="flex" justify="start">
    <Col className={styles.Price}>
      {price} {i18next.t('CURRENCY')}
    </Col>
    {oldPrice &&
    <Col className={styles.OldPrice}>
      {oldPrice} {i18next.t('CURRENCY')}
    </Col>}
  </Row>);
};

Price.propTypes = {
  children: PropTypes.node
};

export default Price;
