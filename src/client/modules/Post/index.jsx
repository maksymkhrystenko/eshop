import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import reducers from './reducers';
import Feature from '../connector';
import {Post,PostEdit} from './chunks';

export default new Feature({
  route: [<Route exact path="/posts" component={Post} />,
    <Route exact path="/post/add" component={PostEdit} />,
    <Route exact path="/post/:id" component={PostEdit} />
  ],
  reducer: { post: reducers }
});
