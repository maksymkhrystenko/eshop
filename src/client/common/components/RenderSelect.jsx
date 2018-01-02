import React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/lib/form';
import {Select} from 'antd';
import i18next from "i18next";

const FormItem = Form.Item;
const ADOption = Select.Option;

const RenderField = (props) => {
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
  const listOfOptions = options.map((option, i) => {
    return (<ADOption className={option.className} value={option.content} key={i}>{i18next.t(option.name)}</ADOption>);
  });
  return (
    <FormItem label={label} validateStatus={validateStatus} help={error}>
        <Select defaultValue={defaultValue} {...input} onChange={(values) => {
          change(values);
        }} style={style} type={type}>
          {listOfOptions}
        </Select>
    </FormItem>
  );
};

RenderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  children: PropTypes.node
};

export default RenderField;
