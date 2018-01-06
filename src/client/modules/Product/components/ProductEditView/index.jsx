import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { PageLayout, Col } from '../../../../common/components';
import ProductForm from '../ProductForm';
import ProductComments from '../../containers/ProductComments';

const onSubmit = (product, addProduct, editProduct) => values => {
  if (product) {
    editProduct(product.id, values.title, values.description);
  } else {
    addProduct(values.title, values.description);
  }
};

const ProductEditView = ({
  loading,
  product,
  match,
  location,
  subscribeToMore,
  addProduct,
  editProduct
}) => {
  let productObj = product;

  // if new product was just added read it from router
  if (!productObj && location.state) {
    productObj = location.state.product;
  }

  const renderMetaData = () => (
    <Helmet
      title="App - Edit product"
      meta={[
        {
          name: 'description',
          content: 'Edit product example page'
        }
      ]}
    />
  );

  if (loading && !productObj) {
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
        <Link id="back-button" to="/products">
          Back
        </Link>
        <h2>{product ? 'Edit' : 'Create'} Product</h2>
        <ProductForm
          onSubmit={onSubmit(productObj, addProduct, editProduct)}
          initialValues={productObj}
        />
        <br />
        {productObj && (
          <ProductComments
            productId={Number(match.params.id)}
            comments={productObj.comments}
            subscribeToMore={subscribeToMore}
          />
        )}
      </Col>
    </PageLayout>
  );
};

ProductEditView.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.object,
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  subscribeToMore: PropTypes.func.isRequired
};

ProductEditView.defaultProps = {
  product: null
};

export default ProductEditView;
