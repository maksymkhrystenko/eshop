import React from 'react';
import PropTypes from 'prop-types';
import ADCol from 'antd/lib/col';

const Col = ({ children, ...props }) => <ADCol {...props}>{children}</ADCol>;

Col.propTypes = {
  children: PropTypes.node
};

Col.defaultProps = {
  children: null
};

export default Col;
