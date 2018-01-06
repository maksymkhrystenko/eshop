import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
// import url from 'url';
import { NavLink, Link } from 'react-router-dom';

import { Form, RenderField, Alert, Button } from '../../../common/components';
import { required, email, minLength } from '../../../common/utils/validation';

// const { protocol, hostname, port } = url.parse('http://localhost:3004');
/*
let serverPort = process.env.PORT || port;
if (__DEV__) {
  serverPort = '3004';
}
*/

/* const facebookLogin = () => {
  window.location = `${protocol}//${hostname}:${serverPort}/auth/facebook`;
};

const googleLogin = () => {
  window.location = `${protocol}//${hostname}:${serverPort}/auth/google`;
}; */

const LoginForm = ({ handleSubmit, submitting, onSubmit, error }) => (
  <Form name="login" onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="email"
      component={RenderField}
      type="email"
      label="Email"
      validate={[required, email]}
    />
    <Field
      name="password"
      component={RenderField}
      type="password"
      label="Password"
      validate={[required, minLength(5)]}
    />
    <div className="text-center">
      {error && <Alert color="error">{error}</Alert>}
    </div>
    <div className="text-center">
      <Button color="primary" htmlType="submit" disabled={submitting}>
        Login
      </Button>
      {/*    {settings.user.auth.facebook.enabled && (
          <Button color="primary" type="button" onClick={facebookLogin} style={{ margin: 10 }}>
            Login with Facebook
          </Button>
        )} */}
      {/*  {settings.user.auth.google.enabled && (
          <Button color="primary" type="button" onClick={googleLogin} style={{ margin: 10 }}>
            Login with Google
          </Button>
        )} */}
    </div>
    <Link className="text-center" to="/forgot-password">
      Forgot your password?
    </Link>
    <hr />
    <div style={{ marginBottom: 16 }}>
      <span style={{ lineHeight: '58px' }}>Not registered yet?</span>
      <NavLink
        className="btn btn-primary"
        to="/register"
        activeClassName="active"
        style={{ margin: 10 }}
      >
        Sign Up
      </NavLink>
    </div>
  </Form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string
};

LoginForm.defaultProps = {
  error: null
};

export default reduxForm({
  form: 'login'
})(LoginForm);
