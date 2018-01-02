import React from 'react';
import PropTypes from 'prop-types';
import i18next from "i18next";
//import ADSelect from 'antd/lib/select';

const Select = ({ options, ...props }) => {
  const listOfOptions = options.map((option, i) => {
    return (<option className={option.className} value={option.content} key={i}>{i18next.t(option.name) }</option>);
  });
  return <select {...props}>{listOfOptions}</select>;
};

Select.propTypes = {
  children: PropTypes.node
};

export default Select;
