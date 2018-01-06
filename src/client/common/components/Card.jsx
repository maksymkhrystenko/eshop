import React from 'react';
import PropTypes from 'prop-types';
import ADCard from 'antd/lib/card';

const Card = ({ children, ...props }) => <ADCard {...props}>{children}</ADCard>;

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;
