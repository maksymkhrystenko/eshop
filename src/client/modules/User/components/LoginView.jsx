import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';

import {
  LayoutCenter,
  PageLayout,
  Card,
  CardGroup,
  CardTitle,
  CardText
} from '../../../common/components';

import LoginForm from '../components/LoginForm';

class LoginView extends React.PureComponent {
  onSubmit = login => async values => {
    const result = await login(values);
    if (result.errors) {
      const submitError = {
        _error: 'Login failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    }
  };

  render() {
    const { login } = this.props;
    const renderMetaData = () => (
      <Helmet
        title="App - Login"
        meta={[
          {
            name: 'description',
            content: `App - Login page`
          }
        ]}
      />
    );

    return (
      <PageLayout>
        {renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Sign In</h1>
          <LoginForm onSubmit={this.onSubmit(login)} />
          <hr />
          <Card>
            <CardGroup>
              <CardTitle>Available logins:</CardTitle>
              <CardText>admin@example.com:admin</CardText>
              <CardText>user@example.com:user</CardText>
            </CardGroup>
          </Card>
        </LayoutCenter>
      </PageLayout>
    );
  }
}

LoginView.propTypes = {
  login: PropTypes.func.isRequired
};

export default LoginView;
