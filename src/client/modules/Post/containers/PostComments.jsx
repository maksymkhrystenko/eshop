import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { reset } from 'redux-form';

import PostCommentsView from '../components/PostCommentsView';

import ADD_COMMENT from '../graphql/AddComment.graphql';
import EDIT_COMMENT from '../graphql/EditComment.graphql';
import DELETE_COMMENT from '../graphql/DeleteComment.graphql';
import COMMENT_SUBSCRIPTION from '../graphql/CommentSubscription.graphql';

function AddComment(prev, node) {
  // ignore if duplicate
  if (
    node.id !== null &&
    prev.post.comments.some(comment => node.id === comment.id)
  ) {
    return prev;
  }

  return update(prev, {
    post: {
      comments: {
        $push: [node]
      }
    }
  });
}

function DeleteComment(prev, id) {
  const index = prev.post.comments.findIndex(x => x.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    post: {
      comments: {
        $splice: [[index, 1]]
      }
    }
  });
}

class PostComments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    // Check if props have changed and, if necessary, stop the subscription
    if (this.subscription && this.props.postId !== nextProps.postId) {
      this.subscription = null;
    }
    // Subscribe or re-subscribe
    if (!this.subscription) {
      this.subscribeToCommentList(nextProps.postId);
    }
  }

  componentWillUnmount() {
    this.props.onCommentSelect({ id: null, content: '' });

    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  subscribeToCommentList = postId => {
    const { subscribeToMore } = this.props;
    const subscribeToMoreQuery = {
      document: COMMENT_SUBSCRIPTION,
      variables: { postId },
      updateQuery: (prev, props) => {
        const { subscriptionData: { data: { commentUpdated } } } = props;
        let newResult = prev;
        if (commentUpdated) {
          const { mutation, id, node } = commentUpdated;
          if (mutation === 'CREATED') {
            newResult = AddComment(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeleteComment(prev, id);
          }
        }
        return newResult;
      }
    };
    this.subscription = subscribeToMore(subscribeToMoreQuery);
  };

  render() {
    return <PostCommentsView {...this.props} />;
  }
}

PostComments.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  onCommentSelect: PropTypes.func.isRequired,
  onFormSubmitted: PropTypes.func.isRequired,
  subscriptionData: PropTypes.object,
  subscribeToMore: PropTypes.func.isRequired
};

const PostCommentsWithApollo = compose(
  graphql(ADD_COMMENT, {
    props: ({ mutate }) => ({
      addComment: (content, postId) => {
        const mutateQuery = {
          variables: { input: { content, postId } },
          updateQueries: {
            post: (prev, { mutationResult: { data: { addComment } } }) => {
              if (prev.post) {
                return AddComment(prev, addComment);
              }
            }
          }
        };
        return mutate(mutateQuery);
      }
    })
  }),
  graphql(EDIT_COMMENT, {
    props: ({ ownProps: { postId }, mutate }) => ({
      editComment: (id, content) => {
        const mutateQuery = {
          variables: { input: { id, postId, content } },
          optimisticResponse: {
            __typename: 'Mutation',
            editComment: {
              __typename: 'Comment',
              id,
              content
            }
          }
        };
        return mutate(mutateQuery);
      }
    })
  }),
  graphql(DELETE_COMMENT, {
    props: ({ ownProps: { postId }, mutate }) => ({
      deleteComment: id => {
        const mutateQuery = {
          variables: { input: { id, postId } },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteComment: {
              __typename: 'Comment',
              id
            }
          },
          updateQueries: {
            post: (prev, { mutationResult: { data: { deleteComment } } }) => {
              if (prev.post) {
                return DeleteComment(prev, deleteComment.id);
              }
            }
          }
        };
        return mutate(mutateQuery);
      }
    })
  })
)(PostComments);

export default connect(
  state => ({ comment: state.post.comment }),
  dispatch => ({
    onCommentSelect(comment) {
      const dispatchQuery = {
        type: 'COMMENT_SELECT',
        value: comment
      };
      dispatch(dispatchQuery);
    },
    onFormSubmitted() {
      dispatch(reset('comment'));
    }
  })
)(PostCommentsWithApollo);
