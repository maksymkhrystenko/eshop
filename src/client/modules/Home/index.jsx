import React from 'react';
import { Route } from 'react-router-dom';

import reducers from './reducers';
import Feature from '../connector';
import loadable from 'loadable-components';

//const Home = loadable(() => import('./containers/Home'));
import Home from './containers/Home';

export default new Feature({
  route: <Route exact path="/" component={Home} />,
  reducer: { home: reducers }
});
