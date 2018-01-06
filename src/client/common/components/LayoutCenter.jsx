import React from 'react';
import PropTypes from 'prop-types';

const LayoutCenter = ({ children, ...props }) => (
  <div style={{ width: 600, margin: '0 auto' }} {...props}>
    {children}
  </div>
);

LayoutCenter.propTypes = {
  children: PropTypes.node
};

LayoutCenter.defaultProps = {
  children: null
};

export default LayoutCenter;
