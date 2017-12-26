import React from 'react';
import PropTypes from 'prop-types';
import {Link as ADLink} from 'react-router-dom';

import {Icon} from 'antd';
import {Col, Row, Label, Link} from '../../components';
import styles from './styles.scss';
import i18next from "i18next";

const Rates = ({children, ...props}) => {
  return (<Col className={styles.RateBlock}>
    <Col span={14} className={styles.Rate}>
      <Icon type="star"/>
      <Icon type="star"/>
      <Icon type="star"/>
      <Icon type="star"/>
      <Icon type="star"/>
    </Col>
    <Col span={10} className={styles.Feedbacks}>
      {'(0) '}{i18next.t('FEEDBACKS')}
    </Col>
  </Col>);
};

Link.propTypes = {
  children: PropTypes.node
};

export default Rates;
