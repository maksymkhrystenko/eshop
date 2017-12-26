import React from 'react';
import PropTypes from 'prop-types';

import {Col, Row} from '../../components';
import i18next from "i18next";
import styles from './styles.scss';

const AbilityInStock = ({ability, children, ...props}) => {
  return (<Row type="flex" justify="start">
    <Col className={styles.AbilityInStock}>
      {i18next.t('ABILITY_IN_STOCK')}
    </Col>
    {ability ?
      <Col className={styles.Presence}>
        {i18next.t('PRESENCE')}
      </Col> :
      <Col className={styles.Absense}>
        {i18next.t('ABSENSE')}
      </Col>}
  </Row>);
};

export default AbilityInStock;
