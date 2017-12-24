import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';

import authFeature from '../../../client/modules/admin/auth';
import './styles.scss';

class FullScreenUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children} = this.props;
    return (
      <div className="full-screen-container">
      <div className="container">
        {/*{children}*/}
        <Switch>
          {authFeature.routes}
        </Switch>
      </div>
      </div>
    );
  }
}

FullScreenUI.propTypes = {
  children: PropTypes.element,
};

export default FullScreenUI;
