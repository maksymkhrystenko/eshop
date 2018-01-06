import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageLayout, Table, Button, Col } from '../../../../common/components';

class ProductList extends React.PureComponent {
  hendleDeleteProduct = id => {
    const { deleteProduct } = this.props;
    deleteProduct(id);
  };

  renderLoadMore = (products, loadMoreRows) => {
    if (products.pageInfo.hasNextPage) {
      return (
        <Button id="load-more" color="primary" onClick={loadMoreRows}>
          Load more ...
        </Button>
      );
    }
  };

  renderMetaData = () => (
    <Helmet
      title="App - Products list"
      meta={[
        {
          name: 'description',
          content: `App - List of all products example page`
        }
      ]}
    />
  );

  render() {
    const { loading, products, loadMoreRows } = this.props;
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
          <Link className="product-link" to={`/product/${record.id}`}>
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
            onClick={() => this.hendleDeleteProduct(record.id)}
          >
            Delete
          </Button>
        )
      }
    ];
    return (
      <PageLayout>
        <Col>
          {this.renderMetaData()}
          <h2>Products</h2>
          <Link to="/product/add">
            <Button color="primary">Add</Button>
          </Link>
          <Table
            dataSource={products.edges.map(({ node }) => node)}
            columns={columns}
          />
          <Col>
            <small>
              ({products.edges.length} / {products.totalCount})
            </small>
          </Col>
          {this.renderLoadMore(products, loadMoreRows)}
        </Col>
      </PageLayout>
    );
  }
}

ProductList.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.object,
  deleteProduct: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired
};

ProductList.defaultProps = {
  products: null
};

export default ProductList;
