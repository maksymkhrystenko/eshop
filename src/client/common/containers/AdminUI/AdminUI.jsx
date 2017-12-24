import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import AdminMainMenu from '../../components/Admin/TopMenu';
import AdminSidebarMenu from '../../components/Admin/SidebarMenu';
import BreadCrumbs from '../../components/BreadCrumbs';
import modules from '../../../modules';
import './styles.scss';

class AdminUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {history} = this.props;
    return (
      <div>
        <div className="admin-main-wrapper">
          <AdminMainMenu history={history}/>
          <div className="container main-container admin" id="content">
            <div className="sidebar">
              <AdminSidebarMenu />
            </div>
            <div className="content-container">
              <BreadCrumbs />
              <Switch>
                {modules.routes}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminUI.propTypes = {
  children: PropTypes.any,
  history: PropTypes.any,
};

export default AdminUI;
