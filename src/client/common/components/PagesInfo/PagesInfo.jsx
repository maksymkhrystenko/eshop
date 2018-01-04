import React from 'react';
import PropTypes from 'prop-types';

import {Col, Row, Label, Link, Button} from '../../components';
import styles from './styles.scss';

const PagesInfo = ({countOfShowedItems, totalCount, ...props}) => {
  return (
    <Row type="flex" justify="end" className={styles.PagesInfo}>
      <Col>
        ({countOfShowedItems} / {totalCount})
      </Col>
    </Row>
  );
};

PagesInfo.propTypes = {
  children: PropTypes.node
};

export default PagesInfo;
