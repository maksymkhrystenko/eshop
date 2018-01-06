import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row } from '../../../components';
import styles from './styles.scss';

const Price = ({ price, oldPrice }) => (
  <Row type="flex" justify="start">
    <Col className={styles.Price}>
      {price} {i18next.t('CURRENCY')}
    </Col>
    {oldPrice && (
      <Col className={styles.OldPrice}>
        {oldPrice} {i18next.t('CURRENCY')}
      </Col>
    )}
  </Row>
);

Price.propTypes = {
  price: PropTypes.number.isRequired,
  oldPrice: PropTypes.number
};

Price.defaultProps = {
  oldPrice: null
};

export default Price;
