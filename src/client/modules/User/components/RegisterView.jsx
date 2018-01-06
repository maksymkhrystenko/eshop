import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';
import { PageLayout, LayoutCenter } from '../../../common/components';

import RegisterForm from '../components/RegisterForm';

class RegisterView extends React.PureComponent {
  onSubmit = register => async values => {
    const result = await register(values);
    if (result.errors) {
      const submitError = {
        _error: 'Registration failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    }
  };

  renderMetaData = () => (
    <Helmet
      title="App - Register"
      meta={[
        {
          name: 'description',
          content: `App - Register page`
        }
      ]}
    />
  );

  render() {
    const { register } = this.props;
    return (
      <PageLayout>
        {this.renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Sign Up</h1>
          <RegisterForm onSubmit={this.onSubmit(register)} />
        </LayoutCenter>
      </PageLayout>
    );
  }
}

RegisterView.propTypes = {
  register: PropTypes.func.isRequired
};

export default RegisterView;
