import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
  RenderField,
  Row,
  Col,
  Label,
  Button
} from '../../../../common/components';

const required = value => (value ? undefined : 'Required');

const PostCommentForm = ({
  handleSubmit,
  submitting,
  initialValues,
  onSubmit
}) => {
  let operation = 'Add';
  if (initialValues.id !== null) {
    operation = 'Edit';
  }

  return (
    <Form name="comment" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col span="2">
          <Label>{operation} comment</Label>
        </Col>
        <Col span="8">
          <Field
            name="content"
            component={RenderField}
            type="text"
            validate={required}
          />
        </Col>
        <Col span="2">
          <Button
            color="primary"
            htmlType="submit"
            className="float-right"
            disabled={submitting}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

PostCommentForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool
};

PostCommentForm.defaultProps = {
  handleSubmit: null,
  initialValues: null,
  onSubmit: null,
  submitting: null
};

export default reduxForm({
  form: 'comment',
  enableReinitialize: true
})(PostCommentForm);
