import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Form, RenderField, Button} from '../../../../common/components';

const required = value => (value ? undefined : 'Required');

const ProductForm = ({handleSubmit, submitting, onSubmit}) => {
  return (
    <Form name="product" onSubmit={handleSubmit(onSubmit)}>
      <Field name="title" component={RenderField} type="text" label="Title" validate={required}/>
      <Field name="description" component={RenderField} type="text" label="Content" validate={required}/>
      <Button color="primary" htmlType="submit" disabled={submitting}>
        Save
      </Button>
    </Form>
  );
};

ProductForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'product',
  enableReinitialize: true
})(ProductForm);
