import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { constructUploadOptions } from 'apollo-fetch-upload';

// Component and helpers
import {MenuItem} from '../../common/components';
import reducers from './reducers';
import Feature from '../connector';
import {File} from './chunks';

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
