import React from 'react';
import PropTypes from 'prop-types';
import { Link as ADLink } from 'react-router-dom';

import styles from './styles.scss';

const Link = ({ children, ...props }) => (
  <ADLink className={styles.Link} {...props}>
    {children}
  </ADLink>
);

Link.propTypes = {
  children: PropTypes.node
};

Link.defaultProps = {
  children: null
};

export default Link;
