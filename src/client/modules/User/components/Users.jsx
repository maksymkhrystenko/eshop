import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout, Col, Row } from '../../../common/components';
import Tools from '../../../common/components/Admin/Tools';
import UsersFilter from '../containers/UsersFilter';
import UsersList from '../containers/UsersList';

const Users = () => {
  const renderMetaData = () => (
    <Helmet
      title="App - Users"
      meta={[
        {
          name: 'description',
          content: `App - Users page`
        }
      ]}
    />
  );
  return (
    <PageLayout>
      {renderMetaData()}
      <Row>
        <Col span={24}>
          <h1>Users</h1>
          <Tools addLink="/users/0" />
          <hr />
          <UsersFilter />
          <hr />
          <UsersList />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default Users;
