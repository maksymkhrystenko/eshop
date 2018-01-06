import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import update from 'immutability-helper';
import { reset } from 'redux-form';

import ProductCommentsView from '../components/ProductCommentsView';

import ADD_COMMENT from '../graphql/AddComment.graphql';
import EDIT_COMMENT from '../graphql/EditComment.graphql';
import DELETE_COMMENT from '../graphql/DeleteComment.graphql';
import COMMENT_SUBSCRIPTION from '../graphql/CommentSubscription.graphql';

function AddComment(prev, node) {
  // ignore if duplicate
  if (
    node.id !== null &&
    prev.product.comments.some(comment => node.id === comment.id)
  ) {
    return prev;
  }

  return update(prev, {
    product: {
      comments: {
        $push: [node]
      }
    }
  });
}

function DeleteComment(prev, id) {
  const index = prev.product.comments.findIndex(x => x.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    product: {
      comments: {
        $splice: [[index, 1]]
      }
    }
  });
}

class ProductComments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    // Check if props have changed and, if necessary, stop the subscription
    if (this.subscription && this.props.productId !== nextProps.productId) {
      this.subscription = null;
    }

    // Subscribe or re-subscribe
    if (!this.subscription) {
      this.subscribeToCommentList(nextProps.productId);
    }
  }

  componentWillUnmount() {
    this.props.onCommentSelect({ id: null, content: '' });

    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  subscribeToCommentList = productId => {
    const { subscribeToMore } = this.props;
    this.subscription = subscribeToMore({
      document: COMMENT_SUBSCRIPTION,
      variables: { productId },
      updateQuery: (
        prev,
        { subscriptionData: { data: { commentUpdated } } }
      ) => {
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
    });
  };

  render() {
    return <ProductCommentsView {...this.props} />;
  }
}

ProductComments.propTypes = {
  productId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  onCommentSelect: PropTypes.func.isRequired,
  onFormSubmitted: PropTypes.func.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

const ProductCommentsWithApollo = compose(
  graphql(ADD_COMMENT, {
    props: ({ mutate }) => ({
      addComment: (content, productId) =>
        mutate({
          variables: { input: { content, productId } },
          /*      optimisticResponse: {
                  __typename: 'Mutation',
                  addComment: {
                    __typename: 'Comment',
                    id: null,
                    content: content
                  }
                }, */
          updateQueries: {
            product: (prev, { mutationResult: { data: { addComment } } }) => {
              if (prev.product) {
                return AddComment(prev, addComment);
              }
            }
          }
        })
    })
  }),
  graphql(EDIT_COMMENT, {
    props: ({ ownProps: { productId }, mutate }) => ({
      editComment: (id, content) =>
        mutate({
          variables: { input: { id, productId, content } },
          optimisticResponse: {
            __typename: 'Mutation',
            editComment: {
              __typename: 'Comment',
              id,
              content
            }
          }
        })
    })
  }),
  graphql(DELETE_COMMENT, {
    props: ({ ownProps: { productId }, mutate }) => ({
      deleteComment: id =>
        mutate({
          variables: { input: { id, productId } },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteComment: {
              __typename: 'Comment',
              id
            }
          },
          updateQueries: {
            product: (
              prev,
              { mutationResult: { data: { deleteComment } } }
            ) => {
              if (prev.product) {
                return DeleteComment(prev, deleteComment.id);
              }
            }
          }
        })
    })
  })
)(ProductComments);

export default connect(
  state => ({ comment: state.product.comment }),
  dispatch => ({
    onCommentSelect(comment) {
      dispatch({
        type: 'COMMENT_SELECT',
        value: comment
      });
    },
    onFormSubmitted() {
      dispatch(reset('comment'));
    }
  })
)(ProductCommentsWithApollo);
