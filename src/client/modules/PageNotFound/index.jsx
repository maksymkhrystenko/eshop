import React from 'react';
import { Route } from 'react-router-dom';

import Feature from '../connector';
import {PageNotFound} from './chunks';

export default new Feature({
  route: <Route component={PageNotFound} />
});
