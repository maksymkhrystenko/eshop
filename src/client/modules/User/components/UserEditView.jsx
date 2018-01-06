import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { SubmissionError } from 'redux-form';
import { pick } from 'lodash';

import { PageLayout, Row, Col } from '../../../common/components';
import Back from '../../../common/components/Admin/Back';
import UserForm from './UserForm';

class UserEditView extends React.PureComponent {
  onSubmit = (user, addUser, editUser) => async values => {
    let result = null;
    const userValues = pick(values, [
      'username',
      'email',
      'role',
      'isActive',
      'password'
    ]);
    const profile = pick(values.profile, ['firstName', 'lastName']);
    const insertValues = { ...userValues, profile: { ...profile } };
    if (user) {
      result = await editUser({ id: user.id, ...insertValues });
    } else {
      result = await addUser(insertValues);
    }

    if (result.errors) {
      const submitError = {
        _error: 'Edit user failed!'
      };
      result.errors.map(error => (submitError[error.field] = error.message));
      throw new SubmissionError(submitError);
    }
  };

  renderMetaData = () => (
    <Helmet
      title="App - Edit User"
      meta={[
        {
          name: 'description',
          content: `App - Edit user example page`
        }
      ]}
    />
  );

  render() {
    const { loading, user, addUser, editUser } = this.props;

    if (loading && !user) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <div className="text-center">Loading...</div>
        </PageLayout>
      );
    }
    return (
      <PageLayout>
        {this.renderMetaData()}
        <Row>
          <Col span={24}>
            <Back backLink="/users" />
            <h2>{user ? 'Edit' : 'Create'} User</h2>
            <UserForm
              onSubmit={this.onSubmit(user, addUser, editUser)}
              initialValues={user}
            />
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

UserEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  addUser: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired
};

UserEditView.defaultProps = {
  user: null
};

export default UserEditView;
