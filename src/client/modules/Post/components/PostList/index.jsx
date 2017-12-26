import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import {PageLayout, Table, Button, Col} from '../../../../common/components';
import styles from './styles.scss';

class PostList extends React.PureComponent {
  hendleDeletePost = id => {
    const {deletePost} = this.props;
    deletePost(id);
  };

  renderLoadMore = (posts, loadMoreRows) => {
    if (posts.pageInfo.hasNextPage) {
      return (
        <Button id="load-more" color="primary" onClick={loadMoreRows}>
          Load more ...
        </Button>
      );
    }
  };

  renderMetaData = () => (
    <Helmet
      title={`App - Posts list`}
      meta={[
        {
          name: 'description',
          content: `App - List of all posts example page`
        }
      ]}
    />
  );

  render() {
    const {loading, posts, loadMoreRows} = this.props;
    if (loading) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <div className="text-center">Loading...</div>
        </PageLayout>
      );
    } else {
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          render: (text, record) => (
            <Link className="post-link" to={`/post/${record.id}`}>
              {text}
            </Link>
          )
        },
        {
          title: 'Actions',
          key: 'actions',
          width: 50,
          render: (text, record) => (
            <Button
              color="primary"
              size="small"
              className="delete-button"
              onClick={() => this.hendleDeletePost(record.id)}
            >
              Delete
            </Button>
          )
        }
      ];
      return (
        <PageLayout>
          <Col className={styles.PostList}>
          {this.renderMetaData()}
          <h2>Posts</h2>
          <Link to="/post/add">
            <Button color="primary">Add</Button>
          </Link>
          <h1/>
          <Table dataSource={posts.edges.map(({node}) => node)} columns={columns}/>
          <Col>
            <small>
              ({posts.edges.length} / {posts.totalCount})
            </small>
          </Col>
          {this.renderLoadMore(posts, loadMoreRows)}
          </Col>
        </PageLayout>
      );
    }
  }
}

PostList.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.object,
  deletePost: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired
};

export default PostList;