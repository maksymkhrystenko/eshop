import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from '../../components';
import styles from './styles.scss';

const PagesInfo = ({ countOfShowedItems, totalCount }) => (
  <Row type="flex" justify="end" className={styles.PagesInfo}>
    <Col>
      ({countOfShowedItems} / {totalCount})
    </Col>
  </Row>
);

PagesInfo.propTypes = {
  countOfShowedItems: PropTypes.number,
  totalCount: PropTypes.number
};

PagesInfo.defaultProps = {
  countOfShowedItems: null,
  totalCount: null
};

export default PagesInfo;
