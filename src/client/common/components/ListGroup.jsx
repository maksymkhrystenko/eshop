import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ children, ...props }) => <ul {...props}>{children}</ul>;

ListGroup.propTypes = {
  children: PropTypes.node
};

ListGroup.defaultProps = {
  children: null
};

export default ListGroup;
