import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import i18next from 'i18next';

import {
  PageLayout,
  Table,
  Button,
  Col,
  Row,
  LoadMore,
  PagesInfo
} from '../../../../common/components';
import Tools from '../../../../common/components/Admin/Tools';

class PostList extends React.PureComponent {
  handleDeletePost = id => {
    const { deletePost } = this.props;
    deletePost(id);
  };

  renderMetaData = () => (
    <Helmet
      title="App - Posts list"
      meta={[
        {
          name: 'description',
          content: `App - List of all posts example page`
        }
      ]}
    />
  );

  render() {
    const { loading, posts, loadMoreRows } = this.props;
    if (loading) {
      return (
        <PageLayout>
          {this.renderMetaData()}
          <div className="text-center">Loading...</div>
        </PageLayout>
      );
    }
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
        title: i18next.t('ACTIONS'),
        key: 'actions',
        width: 120,
        render: (text, record) => (
          <Button
            color="primary"
            size="small"
            className="delete-button"
            onClick={() => this.handleDeletePost(record.id)}
          >
            Delete
          </Button>
        )
      }
    ];
    return (
      <PageLayout>
        <Row>
          <Col>
            {this.renderMetaData()}
            <h1>Posts</h1>
            <Tools addLink="/post/add" />
            <Table
              dataSource={posts.edges.map(({ node }) => node)}
              columns={columns}
            />
            <Col>
              <PagesInfo
                countOfShowedItems={posts.edges.length}
                totalCount={posts.totalCount}
              />
            </Col>
            <LoadMore
              hasNextPage={posts.pageInfo.hasNextPage}
              loadMoreRows={loadMoreRows}
            />
          </Col>
        </Row>
      </PageLayout>
    );
  }
}

PostList.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.object,
  deletePost: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired
};

PostList.defaultProps = {
  posts: null
};

export default PostList;
