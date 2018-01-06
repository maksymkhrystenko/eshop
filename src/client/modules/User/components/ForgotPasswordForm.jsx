import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { Form, RenderField, Button, Alert } from '../../../common/components';
import { required, email } from '../../../common/utils/validation';

const ForgotPasswordForm = ({
  handleSubmit,
  submitting,
  onSubmit,
  error,
  sent
}) => (
  <Form name="forgotPassword" onSubmit={handleSubmit(onSubmit)}>
    {sent && (
      <Alert color="success">
        Reset password instructions have been emailed to you.
      </Alert>
    )}
    <Field
      name="email"
      component={RenderField}
      type="email"
      label="Email"
      validate={[required, email]}
    />
    <div className="text-center">
      {error && <Alert color="error">{error}</Alert>}
      <Button color="primary" type="submit" disabled={submitting}>
        Send Reset Instructions
      </Button>
    </div>
  </Form>
);

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  sent: PropTypes.bool
};

ForgotPasswordForm.defaultProps = {
  error: null,
  sent: null
};

export default reduxForm({
  form: 'forgotPassword'
})(ForgotPasswordForm);
