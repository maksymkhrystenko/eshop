/* @flow */

import React from 'react';
import type { Element } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash/fp';
import loadable from 'loadable-components';

import asyncComponent from '../../../common/asyncComponent';

import config from '../../config';
//import routes from '../../routes';

import modules from '../../modules';

// Import your global styles here
import '../../theme/normalize.css';
import styles from './styles.scss';

import EShopUI from '../../common/containers/EShopUI/EShopUI';
import AdminUI from '../../common/containers/AdminUI';

/*const EShopUI = asyncComponent(() => import('../../common/containers/EShopUI'));
//const AdminUI = asyncComponent(() => import('../../common/containers/AdminUI'));*/
//const EShopUI = loadable(() => import('../../common/containers/EShopUI'));
//const AdminUI = loadable(() => import('../../common/containers/AdminUI'));


//const FullScreenUI = asyncComponent(() => import('../../common/containers/FullScreenUI'));

const App = (): Element<'div'> => {
  return (
    <div className={styles.App}>
      <Helmet {...config.app} />
      <Switch>
        <Route path="/admin" component={AdminUI}/>
        {/*<Route path="/auth" component={FullScreenUI}/>*/}
        {/*<Route component={EShopUI}/>*/}
        {modules.routes}
      </Switch>
    </div>
  );
};

export default App;
