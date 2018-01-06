import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from '../../../../common/components';
import ProductCommentForm from '../ProductCommentForm';

class ProductCommentsView extends React.PureComponent {
  onSubmit = () => values => {
    const {
      comment,
      productId,
      addComment,
      editComment,
      onCommentSelect,
      onFormSubmitted
    } = this.props;

    if (comment.id === null) {
      addComment(values.content, productId);
    } else {
      editComment(comment.id, values.content);
    }

    onCommentSelect({ id: null, content: '' });
    onFormSubmitted();
  };

  handleEditComment = (id, content) => {
    const { onCommentSelect } = this.props;
    onCommentSelect({ id, content });
  };

  handleDeleteComment = id => {
    const { comment, onCommentSelect, deleteComment } = this.props;

    if (comment.id === id) {
      onCommentSelect({ id: null, content: '' });
    }
    deleteComment(id);
  };

  render() {
    const { productId, comment, comments } = this.props;

    const columns = [
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        render: (text, record) => (
          <div style={{ width: 120 }}>
            <Button
              color="primary"
              size="small"
              className="edit-comment"
              onClick={() => this.handleEditComment(record.id, record.content)}
            >
              Edit
            </Button>{' '}
            <Button
              color="primary"
              size="small"
              className="delete-comment"
              onClick={() => this.handleDeleteComment(record.id)}
            >
              Delete
            </Button>
          </div>
        )
      }
    ];
    return (
      <div>
        <h3>Comments</h3>
        <ProductCommentForm
          productId={productId}
          onSubmit={this.onSubmit()}
          initialValues={comment}
        />
        <Table dataSource={comments} columns={columns} />
      </div>
    );
  }
}

ProductCommentsView.propTypes = {
  productId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  onCommentSelect: PropTypes.func.isRequired,
  onFormSubmitted: PropTypes.func.isRequired
};

export default ProductCommentsView;
