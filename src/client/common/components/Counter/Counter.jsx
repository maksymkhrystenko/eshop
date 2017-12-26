import React from 'react';
import PropTypes from 'prop-types';
import {InputNumber} from 'antd';

import {Col, Row} from '../../components';
import i18next from "i18next";
import styles from './styles.scss';

function onChange(value) {
  console.log('changed', value);
}

const Counter = ({isText, children, ...props}) => {
  return (<Row type="flex" justify="start">
    {isText && <Col span={24} className={styles.Count}>
      {i18next.t('COUNT')}
    </Col>}
    <InputNumber min={1} max={10} defaultValue={1} onChange={onChange}/>
  </Row>);
};

export default Counter;
