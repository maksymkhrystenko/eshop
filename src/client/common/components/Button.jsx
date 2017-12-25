import React from 'react';
import PropTypes from 'prop-types';
import {Button as ADButton} from 'antd';

const Button = ({children, ...props}) => {
  return (
    <ADButton  {...props}>
      {children}
    </ADButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string
};

export default Button;
