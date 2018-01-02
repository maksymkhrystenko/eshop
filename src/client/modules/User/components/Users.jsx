import React from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import {PageLayout, Button, Col, Row} from '../../../common/components';
import UsersFilter from '../containers/UsersFilter';
import UsersList from '../containers/UsersList';

const Users = () => {
  const renderMetaData = () => (
    <Helmet
      title={`App - Users`}
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
        <h2>Users</h2>
        <Link to="/users/0">
          <Button color="primary">Add</Button>
        </Link>
        <hr/>
        <UsersFilter/>
        <hr/>
        <UsersList/>
      </Col>
      </Row>
    </PageLayout>
  );
};

export default Users;
