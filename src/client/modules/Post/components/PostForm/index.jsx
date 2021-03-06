import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Button } from '../../../../common/components';

const required = value => (value ? undefined : 'Required');

const PostForm = ({ handleSubmit, submitting, onSubmit }) => (
  <Form name="post" onSubmit={handleSubmit(onSubmit)}>
    <Field
      name="title"
      component={RenderField}
      type="text"
      label="Title"
      validate={required}
    />
    <Field
      name="content"
      component={RenderField}
      type="text"
      label="Content"
      validate={required}
    />
    <Button color="primary" htmlType="submit" disabled={submitting}>
      Save
    </Button>
  </Form>
);

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default reduxForm({
  form: 'post',
  enableReinitialize: true
})(PostForm);
