import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, RenderField, Row, Col, Label, Button } from '../../../../common/components';

const required = value => (value ? undefined : 'Required');

const ProductCommentForm = ({ handleSubmit, submitting, initialValues, onSubmit }) => {
  let operation = 'Add';
  if (initialValues.id !== null) {
    operation = 'Edit';
  }

  return (
    <Form name="comment" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col xs="2">
          <Label>{operation} comment</Label>
        </Col>
        <Col xs="8">
          <Field name="content" component={RenderField} type="text" validate={required} />
        </Col>
        <Col xs="2">
          <Button color="primary" htmlType="submit" className="float-right" disabled={submitting}>
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

ProductCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

export default reduxForm({
  form: 'comment',
  enableReinitialize: true
})(ProductCommentForm);