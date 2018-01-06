import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

const RenderCheckBox = props => {
  const { change, input, label, meta } = props;
  let validateStatus = '';
  if (meta && meta.error && meta.touched) {
    validateStatus = 'error';
  }
  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      help={meta ? meta.error : null}
    >
      <div>
        {change ? (
          <Checkbox
            {...input}
            onChange={values => {
              change(values);
            }}
          />
        ) : (
          <Checkbox {...input} />
        )}
      </div>
    </FormItem>
  );
};

RenderCheckBox.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  change: PropTypes.func,
  meta: PropTypes.object
};

export default RenderCheckBox;
