import React from 'react';
import { Route, NavLink } from 'react-router-dom';
//import { MenuItem } from '../Antd/components';

import Post from './containers/Post';
import PostEdit from './containers/PostEdit';

import reducers from './reducers';

import Feature from '../connector';

export default new Feature({
  route: [<Route exact path="/posts" component={Post} />,
    <Route exact path="/post/add" component={PostEdit} />,
    <Route exact path="/post/:id" component={PostEdit} />
  ],
  reducer: { post: reducers }
});
