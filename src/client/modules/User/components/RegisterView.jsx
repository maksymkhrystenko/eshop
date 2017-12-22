import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {SubmissionError} from 'redux-form';
import {PageLayout, LayoutCenter} from '../../../common/components';

import RegisterForm from '../components/RegisterForm';

export default class RegisterView extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string,
    register: PropTypes.func.isRequired
  };


  onSubmit = register => async values => {
    const result = await register(values);
    if (result.errors) {
      let submitError = {
        _error: 'Registration failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    }
  };


  renderMetaData = () => (
    <Helmet
      title={`App - Register`}
      meta={[
        {
          name: 'description',
          content: `App - Register page`
        }
      ]}
    />
  );

  render() {
    const {register} = this.props;
    return (
      <PageLayout>
        {this.renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Sign Up</h1>
          <RegisterForm onSubmit={this.onSubmit(register)}/>
        </LayoutCenter>
      </PageLayout>
    );
  }
}
