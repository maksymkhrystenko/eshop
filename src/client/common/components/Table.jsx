import React from 'react';
import PropTypes from 'prop-types';
import ADTable from 'antd/lib/table';

const Table = ({ ...props }) => (
  <ADTable pagination={false} {...props} rowKey="id" />
);

Table.propTypes = {
  children: PropTypes.node
};

Table.defaultProps = {
  children: null
};

export default Table;
