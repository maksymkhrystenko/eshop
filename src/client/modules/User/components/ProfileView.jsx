import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {
  LayoutCenter,
  Card,
  CardGroup,
  CardTitle,
  CardText,
  PageLayout
} from '../../../common/components';

const renderMetaData = () => (
  <Helmet
    title="App - Profile"
    meta={[
      {
        name: 'description',
        content: `App - Profile page`
      }
    ]}
  />
);

const ProfileView = ({ loading, currentUser }) => {
  if (loading && !currentUser) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading...</div>
      </PageLayout>
    );
  } else if (currentUser) {
    return (
      <PageLayout>
        {renderMetaData()}
        <LayoutCenter>
          <h1 className="text-center">Profile</h1>
          <Card>
            <CardGroup>
              <CardTitle>User Name:</CardTitle>
              <CardText>{currentUser.username}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>Email:</CardTitle>
              <CardText>{currentUser.email}</CardText>
            </CardGroup>
            <CardGroup>
              <CardTitle>Role:</CardTitle>
              <CardText>{currentUser.role}</CardText>
            </CardGroup>
            {currentUser.profile &&
              currentUser.profile.fullName && (
                <CardGroup>
                  <CardTitle>Full Name:</CardTitle>
                  <CardText>{currentUser.profile.fullName}</CardText>
                </CardGroup>
              )}
          </Card>
        </LayoutCenter>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      {renderMetaData()}
      <h2>No current user logged in</h2>
    </PageLayout>
  );
};

ProfileView.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object
};

ProfileView.defaultProps = {
  currentUser: null
};

export default ProfileView;
