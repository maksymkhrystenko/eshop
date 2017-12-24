import React from 'react';
import { Route } from 'react-router-dom';

import reducers from './reducers';
import Feature from '../connector';
import {Home} from './chunks';

export default new Feature({
  route: <Route exact path="/" component={Home} />,
  reducer: { home: reducers },
});
