import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

const RenderCheckBox = (props) => {
  let {options, change, defaultValue, input, label, type, children, meta, style} = props;
  let touched, error;
  if (meta) {
    touched = meta.touched;
    error = meta.error;
  }

  let validateStatus = '';
  if (touched && error) {
    validateStatus = 'error';
  }

  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
      <div>
        <Checkbox {...input} onChange={(values) => {
          change(values);
        }}/>
      </div>
    </FormItem>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderCheckBox;
