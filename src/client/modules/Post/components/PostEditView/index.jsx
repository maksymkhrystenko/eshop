import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, Col } from '../../../../common/components';
import Back from '../../../../common/components/Admin/Back';
import PostForm from '../PostForm';
import PostComments from '../../containers/PostComments';

const onSubmit = (post, addPost, editPost) => values => {
  if (post) {
    editPost(post.id, values.title, values.content);
  } else {
    addPost(values.title, values.content);
  }
};

const PostEditView = props => {
  const {
    loading,
    post,
    match,
    location,
    subscribeToMore,
    addPost,
    editPost
  } = props;
  let postObj = post;

  // if new post was just added read it from router
  if (!postObj && location.state) {
    postObj = location.state.post;
  }

  const renderMetaData = () => (
    <Helmet
      title="App - Edit post"
      meta={[
        {
          name: 'description',
          content: 'Edit post example page'
        }
      ]}
    />
  );

  if (loading && !postObj) {
    return (
      <PageLayout>
        {renderMetaData()}
        <div className="text-center">Loading...</div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <Col>
        {renderMetaData()}
        <Back backLink="/posts" />
        <h2>{post ? 'Edit' : 'Create'} Post</h2>
        <PostForm
          onSubmit={onSubmit(postObj, addPost, editPost)}
          initialValues={postObj}
        />
        <br />
        {postObj && (
          <PostComments
            postId={Number(match.params.id)}
            comments={postObj.comments}
            subscribeToMore={subscribeToMore}
          />
        )}
      </Col>
    </PageLayout>
  );
};

PostEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  post: PropTypes.object,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

PostEditView.defaultProps = {
  post: null
};

export default PostEditView;
