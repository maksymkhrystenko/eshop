import React from 'react';
import PropTypes from 'prop-types';

const CardText = ({ children, ...props }) => <p {...props}>{children}</p>;

CardText.propTypes = {
  children: PropTypes.node.isRequired
};

export default CardText;
