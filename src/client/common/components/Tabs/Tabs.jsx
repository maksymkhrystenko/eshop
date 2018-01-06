import React from 'react';
import { Tabs as ADTabs } from 'antd';
import type { Element } from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

const { TabPane } = ADTabs;

type Props = { list: Array<Object> };

const Tabs = ({ tabs, ...rest }: Props): Element<'div'> => {
  const listOfTabs = tabs.map(tab => (
    <TabPane className={tab.className} tab={i18next.t(tab.name)} key={tab.id}>
      {tab.content}
    </TabPane>
  ));
  return <ADTabs {...rest}>{listOfTabs}</ADTabs>;
};

Tabs.propTypes = {
  tabs: PropTypes.array
};

Tabs.defaultProps = {
  tabs: null
};

export default Tabs;
