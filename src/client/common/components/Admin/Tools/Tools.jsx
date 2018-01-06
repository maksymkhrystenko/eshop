import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import { Col, Row, Link, Button } from '../../../components';
import styles from './styles.scss';

const Tools = ({ addLink }) => (
  <Row type="flex" justify="end" className={styles.ToolsBlock}>
    <Col>
      {addLink && (
        <Link to={addLink}>
          <Button color="primary">{i18next.t('ADD')}</Button>
        </Link>
      )}
    </Col>
  </Row>
);

Tools.propTypes = {
  addLink: PropTypes.string.isRequired
};

export default Tools;
