import React from 'react';
import PropTypes from 'prop-types';
import {graphql, compose} from 'react-apollo';
import update from 'immutability-helper';

import ProductList from '../components/ProductList';

import PRODUCTS_QUERY from '../graphql/ProductsQuery.graphql';
import PRODUCTS_SUBSCRIPTION from '../graphql/ProductsSubscription.graphql';
import DELETE_PRODUCT from '../graphql/DeleteProduct.graphql';

export function AddProduct(prev, node) {
  // ignore if duplicate
  if (node.id !== null && prev.products.edges.some(product => node.id === product.cursor)) {
    return prev;
  }

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ProductEdges'
  };

  return update(prev, {
    products: {
      totalCount: {
        $set: prev.products.totalCount + 1
      },
      edges: {
        $unshift: [edge]
      }
    }
  });
}

function DeleteProduct(prev, id) {
  const index = prev.products.edges.findIndex(x => x.node.id === id);

  // ignore if not found
  if (index < 0) {
    return prev;
  }

  return update(prev, {
    products: {
      totalCount: {
        $set: prev.products.totalCount - 1
      },
      edges: {
        $splice: [[index, 1]]
      }
    }
  });
}

class Product extends React.PureComponent {
  constructor(props) {
    super(props);

    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      const endCursor = this.props.products ? this.props.products.pageInfo.endCursor : 0;
      const nextEndCursor = nextProps.products.pageInfo.endCursor;

      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && endCursor !== nextEndCursor) {
        this.subscription();
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (!this.subscription) {
        this.subscribeToProductList(nextEndCursor);
      }
    }
  }

  subscribeToProductList = endCursor => {
    const {subscribeToMore} = this.props;
    this.subscription = subscribeToMore({
      document: PRODUCTS_SUBSCRIPTION,
      variables: {endCursor},
      updateQuery: (prev, updateQuery) => {
        let {subscriptionData: {data: {productsUpdated}}} = updateQuery;
        let newResult = prev;
        if (productsUpdated) {
          let {mutation, node} = productsUpdated;
          if (mutation === 'CREATED') {
            newResult = AddProduct(prev, node);
          } else if (mutation === 'DELETED') {
            newResult = DeleteProduct(prev, node.id);
          }
          return newResult;
        }
      }
    });
  };

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  render() {
    return <ProductList {...this.props} />;
  }
}

Product.propTypes = {
  loading: PropTypes.bool.isRequired,
  products: PropTypes.object,
  deleteProduct: PropTypes.func.isRequired,
  loadMoreRows: PropTypes.func.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

export default compose(
  graphql(PRODUCTS_QUERY, {
    options: () => {
      return {
        variables: {limit: 10, offset: 0}
      };
    },
    props: ({data}) => {
      const {loading, products, fetchMore, subscribeToMore} = data;
      const loadMoreRows = () => {
        return fetchMore({
          variables: {
            offset: products.pageInfo.endCursor
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const totalCount = fetchMoreResult.products.totalCount;
            const newEdges = fetchMoreResult.products.edges;
            const pageInfo = fetchMoreResult.products.pageInfo;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              products: {
                totalCount,
                edges: [...previousResult.products.edges, ...newEdges],
                pageInfo,
                __typename: 'Products'
              }
            };
          }
        });
      };

      return {loading, products, subscribeToMore, loadMoreRows};
    }
  }),
  graphql(DELETE_PRODUCT, {
    props: ({mutate}) => ({
      deleteProduct: id => {
        mutate({
          variables: {id},
          optimisticResponse: {
            __typename: 'Mutation',
            deleteProduct: {
              id: id,
              __typename: 'Product'
            }
          },
          updateQueries: {
            products: (prev, {mutationResult: {data: {deleteProduct}}}) => {
              return DeleteProduct(prev, deleteProduct.id);
            }
          }
        });
      }
    })
  })
)(Product);
