import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import { Select } from 'antd';
import i18next from 'i18next';

const FormItem = Form.Item;
const ADOption = Select.Option;

const RenderField = props => {
  const {
    options,
    change,
    defaultValue,
    input,
    label,
    type,
    meta,
    style
  } = props;
  let validateStatus = '';
  if (meta && meta.touched && meta.error) {
    validateStatus = 'error';
  }
  const listOfOptions = options.map(option => (
    <ADOption
      className={option.className}
      value={option.content}
      key={option.id}
    >
      {i18next.t(option.name)}
    </ADOption>
  ));
  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      help={meta ? meta.error : null}
    >
      <Select
        defaultValue={defaultValue}
        {...input}
        onChange={values => {
          change(values);
        }}
        style={style}
        type={type}
      >
        {listOfOptions}
      </Select>
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  options: PropTypes.array,
  change: PropTypes.func,
  style: PropTypes.object,
  defaultValue: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};

export default RenderField;
