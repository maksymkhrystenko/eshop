import React from 'react';
import { Route } from 'react-router-dom';
//import loadable from 'loadable-components';

import reducers from './reducers/index';
import Feature from '../connector';
import {Dashboard} from './chunks';

export default new Feature({
  route: <Route exact path="/admin" component={Dashboard}/>,
  reducer: { dashboard: reducers }
});
