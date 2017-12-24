import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading, history } = this.props;
    if (loading) {
      return (
        <div className="text-center">
          Loading...
        </div>
      );
    } else {
      return (
          <div>
            Dashboard
          </div>
      );
    }
  }
}

Dashboard.propTypes = {
};

const DashboardWithApollo = compose()(Dashboard);

export default connect(
  (state) => ({}),
  (dispatch) => ({}),
)(DashboardWithApollo);
