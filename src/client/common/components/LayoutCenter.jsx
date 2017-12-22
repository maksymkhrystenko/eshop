import React from 'react';
import PropTypes from 'prop-types';

const LayoutCenter = ({children, ...props}) => {
  return <div style={{width: 600, margin: '0 auto'}} {...props}>{children}</div>;
};

LayoutCenter.propTypes = {
  children: PropTypes.node
};

export default LayoutCenter;
