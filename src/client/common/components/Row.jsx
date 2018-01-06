import React from 'react';
import PropTypes from 'prop-types';
import ADRow from 'antd/lib/row';

const Row = ({ children, ...props }) => <ADRow {...props}>{children}</ADRow>;

Row.propTypes = {
  children: PropTypes.node
};

Row.defaultProps = {
  children: null
};

export default Row;
