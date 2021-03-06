import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { has } from 'lodash/fp';

import ProductCardView from '../components/ProductCardView';
import { AddProduct } from './Product';
import PRODUCT_QUERY from '../graphql/ProductQuery.graphql';
import ADD_PRODUCT from '../graphql/AddProduct.graphql';
import EDIT_PRODUCT from '../graphql/EditProduct.graphql';
import PRODUCT_SUBSCRIPTION from '../graphql/ProductSubscription.graphql';

class ProductEdit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && this.props.product.id !== nextProps.product.id) {
        this.subscription();
        this.subscription = null;
      }

      // Subscribe or re-subscribe
      if (
        !this.subscription &&
        nextProps.product &&
        nextProps.product.id !== 0
      ) {
        this.subscribeToProductEdit(nextProps.product.id);
      }
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription();
    }
  }

  subscribeToProductEdit = productId => {
    const { subscribeToMore } = this.props;
    this.subscription = subscribeToMore({
      document: PRODUCT_SUBSCRIPTION,
      variables: { id: productId }
    });
  };

  render() {
    return <ProductCardView {...this.props} />;
  }
}

ProductEdit.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

ProductEdit.defaultProps = {
  product: null
};

export default compose(
  graphql(PRODUCT_QUERY, {
    options: props => {
      let id = 0;
      if (has(props.match, 'params') && has(props.match, 'params.id')) {
        id = props.match.params.id;
      } else if (props.navigation) {
        id = props.navigation.state.params.id;
      }
      return {
        variables: { id }
      };
    },
    props({ data: { loading, product, subscribeToMore } }) {
      return { loading, product, subscribeToMore };
    }
  }),
  graphql(ADD_PRODUCT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      addProduct: async (title, description) => {
        const productData = await mutate({
          variables: { input: { title, description } },
          optimisticResponse: {
            __typename: 'Mutation',
            addProduct: {
              __typename: 'Product',
              id: null,
              title,
              description,
              comments: []
            }
          },
          updateQueries: {
            products: (prev, { mutationResult: { data: { addProduct } } }) =>
              AddProduct(prev, addProduct)
          }
        });

        if (history) {
          return history.push(`/product/${productData.data.addProduct.id}`, {
            product: productData.data.addProduct
          });
        } else if (navigation) {
          return navigation.setParams({
            id: productData.data.addProduct.id,
            product: productData.data.addProduct
          });
        }
      }
    })
  }),
  graphql(EDIT_PRODUCT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      editProduct: async (id, title, description) => {
        await mutate({
          variables: { input: { id, title, description } }
        });

        if (history) {
          return history.push('/products');
        }
        if (navigation) {
          return navigation.goBack();
        }
      }
    })
  })
)(ProductEdit);
