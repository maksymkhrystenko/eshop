import React from 'react';
import { Route } from 'react-router-dom';
// import i18next from 'i18next';

import reducers from './reducers';
import Feature from '../connector';
import { /* Product, ProductEdit, */ ProductCard } from './chunks';
// import { MenuItem } from '../../common/components';
import config from '../../config';
import { setLanguage } from '../../common/utils/helpers';

setLanguage(config.language);

export default new Feature({
  route: [
    /*   <Route exact path="/products" component={Product}/>,
    <Route exact path="/product/add" component={ProductEdit}/>,
    <Route exact path="/product/:id" component={ProductEdit}/> */
    <Route exact path="/product-card/:id" component={ProductCard} />
  ],
  /*  navItem: (
    <MenuItem key="/products">
      <NavLink to="/products" className="nav-link" activeClassName="active">
        {i18next.t('NAVBAR_MENU_PRODUCTS')}
      </NavLink>
    </MenuItem>
  ), */
  reducer: { product: reducers }
});
