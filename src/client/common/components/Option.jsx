import React from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';

const Option = ({ children, ...props }) => {
  return <Select.Option {...props}>{children}</Select.Option>;
};

Option.propTypes = {
  children: PropTypes.node
};

export default Option;
