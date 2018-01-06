import React from 'react';
import PropTypes from 'prop-types';

const CardGroup = ({ children, ...props }) => <div {...props}>{children}</div>;

CardGroup.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardGroup;
