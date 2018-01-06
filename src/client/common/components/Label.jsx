import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ children, ...props }) => <span {...props}>{children}</span>;

Label.propTypes = {
  children: PropTypes.node.isRequired
};

export default Label;
