import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';

const ADFormItem = Form.Item;

const FormItem = ({ children, ...props }) => (
  <ADFormItem {...props}>{children}</ADFormItem>
);

FormItem.propTypes = {
  children: PropTypes.node.isRequired
};

export default FormItem;
