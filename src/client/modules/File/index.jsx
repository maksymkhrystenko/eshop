import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { constructUploadOptions } from 'apollo-fetch-upload';
import {MenuItem} from '../../common/components';

// Component and helpers
import reducers from './reducers';
import Feature from '../connector';
//import asyncComponent from '../../../common/asyncComponent';

//const File = asyncComponent(() => import('./containers/File'));
import File from './containers/File';

export default new Feature({
  catalogInfo: { upload: true },
  route: <Route exact path="/upload" component={File} />,
  navItem: (
    <MenuItem key="/upload">
      <NavLink to="/upload" className="nav-link" activeClassName="active">
        Upload
      </NavLink>
    </MenuItem>
  ),
  reducer: { upload: reducers },
  createFetchOptions: constructUploadOptions
});
