import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row, Link, Button } from '../../../components';
import styles from './styles.scss';

const Tools = ({ backLink }) => (
  <Row type="flex" justify="end" className={styles.Back}>
    <Col>
      {backLink && (
        <Link to={backLink}>
          <Button color="primary">{i18next.t('BACK')}</Button>
        </Link>
      )}
    </Col>
  </Row>
);

Tools.propTypes = {
  backLink: PropTypes.string.isRequired
};

export default Tools;
