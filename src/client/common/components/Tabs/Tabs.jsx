import React from 'react';
import {Tabs as ADTabs} from 'antd';
import type {Element} from 'react';
import i18next from 'i18next';

const TabPane = ADTabs.TabPane;

type Props = { list: Array<Object> };

const Tabs = ({tabs, ...rest}: Props): Element<'div'> => {
  const listOfTabs = tabs.map((tab, i) => {
    return (<TabPane className={tab.className} tab={i18next.t(tab.name)} key={i}>{tab.content}</TabPane>);
  });
  return (
    <ADTabs {...rest} >
      {listOfTabs}
    </ADTabs>
  )
};

export default Tabs;
