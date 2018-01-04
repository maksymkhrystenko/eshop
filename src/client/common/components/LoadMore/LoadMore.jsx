import React from 'react';
import PropTypes from 'prop-types';

import {Col, Row, Label, Link, Button} from '../../components';
import styles from './styles.scss';
import i18next from "i18next";

const LoadMore = ({hasNextPage, loadMoreRows, ...props}) => {
  if (hasNextPage) {
    return (
      <Row type="flex" justify="end" className={styles.LoadMore}>
        <Col>
          <Button id="load-more" color="primary" onClick={loadMoreRows}>
            {i18next.t('LOAD_MORE')}
          </Button>
        </Col>
      </Row>
    );
  } else {
    return (
      <Col/>
    );
  }
};

LoadMore.propTypes = {
  children: PropTypes.node
};

export default LoadMore;
