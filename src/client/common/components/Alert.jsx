import React from 'react';
import PropTypes from 'prop-types';
import ADAlert from 'antd/lib/alert';

const Alert = ({ children, color, ...props }) => (
  <ADAlert message={children} type={color} {...props} />
);

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired
};

export default Alert;
