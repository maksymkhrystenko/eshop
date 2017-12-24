import React from 'react';
import { Route } from 'react-router-dom';

import Feature from '../connector';
/*import asyncComponent from '../../../common/asyncComponent';

const PageNotFound = asyncComponent(() => import('./containers/PageNotFound'));*/

import PageNotFound from './containers/PageNotFound';

export default new Feature({
  route: <Route component={PageNotFound} />
});
