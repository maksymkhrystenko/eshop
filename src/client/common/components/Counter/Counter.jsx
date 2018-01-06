import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row } from '../../components';
import styles from './styles.scss';

function onChange(value) {
  console.log('changed', value);
}

const Counter = ({ isText }) => (
  <Row type="flex" justify="start">
    {isText && (
      <Col span={24} className={styles.Count}>
        {i18next.t('COUNT')}
      </Col>
    )}
    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
  </Row>
);

Counter.propTypes = {
  isText: PropTypes.bool.isRequired
};

export default Counter;
