import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('Dashboard');
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }
    return <div>Dashboard</div>;
  }
}

Dashboard.propTypes = {
  loading: PropTypes.bool
};

Dashboard.defaultProps = {
  loading: true
};

const DashboardWithApollo = compose()(Dashboard);

export default connect(() => ({}), () => ({}))(DashboardWithApollo);
