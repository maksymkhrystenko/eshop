import React from 'react';
import PropTypes from 'prop-types';

const CardTitle = ({ children, ...props }) => <h1 {...props}>{children}</h1>;

CardTitle.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardTitle;
