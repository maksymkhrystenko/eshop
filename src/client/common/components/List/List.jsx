import React from 'react';
import { List as ADList } from 'antd';

const List = ({ ...rest }): Element<'div'> => (
  <ADList renderItem={item => <ADList.Item>{item}</ADList.Item>} {...rest} />
);

export default List;
