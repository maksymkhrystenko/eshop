import React from 'react';
import PropTypes from 'prop-types';
import {Link as ADLink} from 'react-router-dom';

import styles from './styles.scss';

const Link = ({children, ...props}) => {
  return <ADLink className={styles.Link} {...props}>{children}</ADLink>;
};

Link.propTypes = {
  children: PropTypes.node
};

export default Link;
