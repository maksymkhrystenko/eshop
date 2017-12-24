import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import loadable from 'loadable-components';

import TopMenu from '../../components/EShop/TopMenu';
import SearchMenu from '../../components/EShop/SearchMenu';
import SidebarMenu from '../../components/EShop/SideBarMenu';
import Footer from '../../components/EShop/Footer';
import modules from '../../../modules';
import './styles.scss';

class EShopUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    return (
      /*<div className="eshop-main-wrapper">
        <TopMenu history={history} />
        <SearchMenu />
        <div className="container main-container" id="content">
          <div className="sidebar">
            <SidebarMenu />
          </div>
          <div className="content-container">
            <Switch>*/
              modules.routes
    /*   </Switch>
   /*  <iv>
   </div>
   <Footer />
 </div>*/
    );
  }
}

EShopUI.propTypes = {
  children: PropTypes.any,
  history: PropTypes.any,
};

export default EShopUI;
