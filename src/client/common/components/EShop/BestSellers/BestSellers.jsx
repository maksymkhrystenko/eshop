/* @flow */

import React from 'react';
import type { Element } from 'react';
import PropTypes from 'prop-types';

import { Tabs } from '../../../../common/components';
import ProductCard from '../../../../common/components/EShop/ProductCard';
import styles from './styles.scss';

function callback(key) {
  console.log(key);
}

const BestSellers = ({ countOfProductsPerRow }): Element<'div'> => {
  const productCards = [];
  for (let i = 0; i < 20; i += 1) {
    productCards.push({
      price: 343,
      name: `Product name ${i}`,
      category: 'Product category',
      shortDescription:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. quasi!',
      imageUrl: 'https://dummyimage.com/230x134/ccc/fff',
      uid: i
    });
  }

  const productCardsList = productCards.map(product => (
    <ProductCard
      countOfProductsPerRow={countOfProductsPerRow}
      key={product.uid}
      product={product}
    />
  ));

  const tabs = [
    {
      name: 'BEST_SELLERS_TABS_ALL_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock,
      id: 0
    },
    {
      name: 'BEST_SELLERS_TABS_BEST_RATES_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock,
      id: 1
    },
    {
      name: 'BEST_SELLERS_TABS_BEST_SELLER_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock,
      id: 2
    }
  ];
  return (
    <Tabs
      tabs={tabs}
      className={styles.BestSellers}
      onChange={callback}
      type="card"
    />
  );
};

BestSellers.propTypes = {
  countOfProductsPerRow: PropTypes.number.isRequired
};

export default BestSellers;
