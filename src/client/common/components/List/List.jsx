import React from 'react';
import PropTypes from 'prop-types';
import {List as ADList} from 'antd';
import styles from './styles.scss';

const List = ({...rest}: Props): Element<'div'> => {
  return (
    <ADList renderItem={item => (<ADList.Item>{item}</ADList.Item>)} {...rest} className={styles.List}/>
  )
};


export default List;
