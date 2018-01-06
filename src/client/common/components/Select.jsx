import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

const Select = ({ options, ...props }) => {
  const listOfOptions = options.map(option => (
    <option className={option.className} value={option.content} key={option.id}>
      {i18next.t(option.name)}
    </option>
  ));
  return <select {...props}>{listOfOptions}</select>;
};

Select.propTypes = {
  children: PropTypes.node,
  options: PropTypes.array
};

Select.defaultProps = {
  children: null,
  options: null
};

export default Select;
