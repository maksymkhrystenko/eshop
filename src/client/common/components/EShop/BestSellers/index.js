/* @flow */

import React from 'react';
import type {Element} from 'react';
import i18next from 'i18next';

import {Tabs, Row} from '../../../../common/components';
import ProductCard from '../../../../common/components/EShop/ProductCard';
import styles from './styles.scss';

function callback(key) {
  console.log(key);
}

type Props = { list: Array<Object> };


const BestSellers = ({list, countOfProductsPerRow}: Props): Element<'div'> => {
  let productCards = [];
  for (let i = 0; i < 20; i++) {
    productCards.push({
      price: 343,
      name: 'Product name ' + i,
      category: 'Product category',
      shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, quasi!',
      imageUrl: "https://dummyimage.com/230x134/ccc/fff",
      uid: i
    });
  }

  let productCardsList = productCards.map((product, index) => {
    return (
      <ProductCard countOfProductsPerRow={countOfProductsPerRow} key={index} product={product}/>
    );
  });

  const tabs = [
    {
      name: 'BEST_SELLERS_TABS_ALL_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock
    },
    {
      name: 'BEST_SELLERS_TABS_BEST_RATES_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock
    },
    {
      name: 'BEST_SELLERS_TABS_BEST_SELLER_PRODUCTS',
      content: productCardsList,
      className: styles.CardsBlock
    },
  ];
  return (
    <Tabs tabs={tabs} className={styles.BestSellers} onChange={callback} type="card"/>
  )
};

export default BestSellers;
