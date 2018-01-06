import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row, Button } from '../../components';
import styles from './styles.scss';

const LoadMore = ({ hasNextPage, loadMoreRows }) => {
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
  }
  return <Col />;
};

LoadMore.propTypes = {
  hasNextPage: PropTypes.bool,
  loadMoreRows: PropTypes.func
};

LoadMore.defaultProps = {
  hasNextPage: null,
  loadMoreRows: null
};

export default LoadMore;
