import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ children, ...props }) => <li {...props}>{children}</li>;

ListItem.propTypes = {
  children: PropTypes.node
};

ListItem.defaultProps = {
  children: null
};

export default ListItem;
