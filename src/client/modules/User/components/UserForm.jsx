import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Form, RenderField, RenderSelect, RenderCheckBox, Button, Alert} from '../../../common/components';
import {required, email, minLength} from '../../../common/utils/validation';

const validate = values => {
  const errors = {};

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match';
  }
  return errors;
};

const UserForm = ({handleSubmit, submitting, onSubmit, error, change}) => {
  const options = [
    {
      name: 'USER',
      content: 'user'
    },
    {
      name: 'ADMIN',
      content: 'admin'
    }
  ];

  const onChange = (val) => {
    change('role', val);
  };

  return (
    <Form name="user" onSubmit={handleSubmit(onSubmit)}>
      <Field name="username" component={RenderField} type="text" label="Username" validate={[required, minLength(3)]}/>
      <Field name="email" component={RenderField} type="email" label="Email" validate={[required, email]}/>
      <Field name="role" component={RenderSelect} change={onChange} options={options} type="select" label="Role"/>
      <Field name="isActive" component={RenderCheckBox} type="checkbox" label="Is Active"/>
      <Field name="profile.firstName" component={RenderField} type="text" label="First Name" validate={required}/>
      <Field name="profile.lastName" component={RenderField} type="text" label="Last Name" validate={required}/>
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
      <Button color="primary" htmlType="submit" disabled={submitting}>
        Save
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  error: PropTypes.string
};

export default reduxForm({
  form: 'user',
  validate
})(UserForm);
