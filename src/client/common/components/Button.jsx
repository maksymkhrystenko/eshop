import React from 'react';
import PropTypes from 'prop-types';
import { Button as ADButton } from 'antd';

const Button = ({ children, ...props }) => (
  <ADButton {...props}>{children}</ADButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired
};

export default Button;
