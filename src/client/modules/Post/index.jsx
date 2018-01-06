import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import i18next from 'i18next';

import reducers from './reducers';
import Feature from '../connector';
import { Post, PostEdit } from './chunks';
import { MenuItem } from '../../common/components';
import config from '../../config';
import { setLanguage } from '../../common/utils/helpers';

setLanguage(config.language);

export default new Feature({
  route: [
    <Route exact path="/posts" component={Post} />,
    <Route exact path="/post/add" component={PostEdit} />,
    <Route exact path="/post/:id" component={PostEdit} />
  ],
  navItem: (
    <MenuItem key="/posts">
      <NavLink to="/posts" className="nav-link" activeClassName="active">
        {i18next.t('NAVBAR_MENU_POSTS')}
      </NavLink>
    </MenuItem>
  ),
  reducer: { post: reducers }
});
