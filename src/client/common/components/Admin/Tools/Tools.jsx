import React from 'react';
import PropTypes from 'prop-types';
import {Link as ADLink} from 'react-router-dom';

import {Icon} from 'antd';
import {Col, Row, Label, Link, Button} from '../../../components';
import styles from './styles.scss';
import i18next from "i18next";

const Tools = ({children, addLink, ...props}) => {
  return (
    <Row type="flex" justify="end" className={styles.ToolsBlock}>
      <Col>
        {addLink &&
        <Link to={addLink}>
          <Button color="primary">Add</Button>
        </Link>
        }
      </Col>
    </Row>
  );
};

Tools.propTypes = {
  children: PropTypes.node
};

export default Tools;
