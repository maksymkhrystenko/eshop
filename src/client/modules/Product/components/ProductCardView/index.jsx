import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {Link} from 'react-router-dom';
import i18next from "i18next";
//import { List } from 'antd';

import {
  BreadCrumbs,
  Carousel,
  PageLayout,
  Col,
  Row,
  Rates,
  Tabs,
  List,
  AbilityInStock,
  Counter,
  Button
} from '../../../../common/components';
import BestSellers from '../../../../common/components/EShop/BestSellers';
import FilterSideBar from '../../../../common/components/EShop/FilterSideBar';
import Price from '../../../../common/components/EShop/Price';
import ProductForm from '../ProductForm';
import ProductComments from '../../containers/ProductComments';
import styles from './styles.scss';
import {SubmissionError} from "redux-form";

const onSubmit = (product, addProduct, editProduct) => values => {
  if (product) {
    editProduct(product.id, values.title, values.description);
  } else {
    addProduct(values.title, values.description);
  }
};

const ProductEditView = ({loading, product, match, location, subscribeToMore, addProduct, editProduct}) => {
  let productObj = product;

  // if new product was just added read it from router
  if (!productObj && location.state) {
    productObj = location.state.product;
  }

  const renderMetaData = () => (
    <Helmet
      title={`App - Edit product`}
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
  } else {
    let images = [];
    for (let i = 0; i < 5; i++) {
      images.push({
        imageUrl: `https://dummyimage.com/400x280/${4 + i}${4 + i}${4 + i}/fff`,
        id: i
      });
    }
    const tabs = [
      {
        name: 'PRODUCT_CARD_TABS_DESCRIPTION',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at dolores dolorum eius ex exer1'
      },
      {
        name: 'PRODUCT_CARD_TABS_FEEDBACKS',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at dolores dolorum eius ex exer2'
      },
    ];
    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.'
    ];
    return (
      <PageLayout>
        <Col className={styles.ProductEditView}>
          {renderMetaData()}
          <BreadCrumbs/>
          <Col span={4}>
            <Row>
              <FilterSideBar/>
            </Row>
          </Col>
          <Col offset = {1} span={19}>
            <Row>
              <Row>
                <Col span={10} className={styles.SliderBlock}>
                  <Carousel images={images}/>
                </Col>
                <Col offset = {1} span={13} className={styles.ProductInfoBlock}>
                  <Col span={12} className={styles.Rates}>
                    <Rates/>
                  </Col>
                  <Col span={24} className={styles.Title}>
                    <h1>Product</h1>
                    <hr/>
                  </Col>
                  <Row>
                    <Col span={10}>
                      <List
                        size="small"
                        dataSource={data}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Price price={455} oldPrice={850}/>
                    </Col>
                    <Col span={24}>
                      <AbilityInStock ability={true}/>
                    </Col>
                    <Col span={24}>
                      <Counter isText={true}/>
                    </Col>
                    <Col span={24}>
                      <Button className={styles.AddToCart} type="primary">{i18next.t('BUTTON_ADD_TO_CART')}</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Tabs tabs={tabs} className={styles.Description} type="card"/>
              </Row>
              <Row>
                <BestSellers countOfProductsPerRow={4}/>
              </Row>
            </Row>
          </Col></Col>
      </PageLayout>
    );
  }
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

export default ProductEditView;
