import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Button, Alert } from '../../../common/components';
import { required, minLength } from '../../../common/utils/validation';

const validate = values => {
  const errors = {};

  if (
    values.password &&
    values.passwordConfirmation &&
    values.password !== values.passwordConfirmation
  ) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  return errors;
};

const ResetPasswordForm = ({ handleSubmit, submitting, onSubmit, error }) => (
  <Form name="resetPassword" onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="password"
      component={RenderField}
      type="password"
      label="Password"
      validate={[required, minLength(5)]}
    />
    <Field
      name="passwordConfirmation"
      component={RenderField}
      type="password"
      label="Password Confirmation"
      validate={[required, minLength(5)]}
    />
    {error && <Alert color="error">{error}</Alert>}
    <Button color="primary" type="submit" disabled={submitting}>
      Reset Password
    </Button>
  </Form>
);

ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

export default reduxForm({
  form: 'resetPassword',
  validate
})(ResetPasswordForm);
