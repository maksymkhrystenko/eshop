import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row } from '../../components';
import styles from './styles.scss';

const AbilityInStock = ({ ability }) => (
  <Row type="flex" justify="start">
    <Col className={styles.AbilityInStock}>{i18next.t('ABILITY_IN_STOCK')}</Col>
    {ability ? (
      <Col className={styles.Presence}>{i18next.t('PRESENCE')}</Col>
    ) : (
      <Col className={styles.Absense}>{i18next.t('ABSENSE')}</Col>
    )}
  </Row>
);

AbilityInStock.propTypes = {
  ability: PropTypes.bool.isRequired
};

export default AbilityInStock;
