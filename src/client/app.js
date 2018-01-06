/* @flow */

import React from 'react';
import type { Element } from 'react';
import { Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import config from './config';
import modules from './modules';

// Import global styles
import './common/styles/normalize.css';
import styles from './common/styles/styles.scss';

const App = (): Element<'div'> => (
  <div className={styles.App}>
    <Helmet {...config.app} />
    <Switch>{modules.routes}</Switch>
  </div>
);

export default App;
