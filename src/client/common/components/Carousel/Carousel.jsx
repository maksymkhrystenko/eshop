import React from 'react';
import {Carousel  as ADCarousel, Col} from 'antd';
import type {Element} from 'react';

import styles from './styles.scss';

type Props = { list: Array<Object> };

const Carousel = ({images, ...rest}: Props): Element<'div'> => {
  const listOfImages = images.map((image, i) => {
    return (<div key={image.id}><img src={image.imageUrl} alt=""/></div>);
  });
  return (
    <Col className={styles.Carousel}>
      <ADCarousel customPaging={(i, img) => {
        return <Col className={styles.Dot}><img src={images[i].imageUrl} alt=""/></Col>;
      }} effect="fade">
        {listOfImages}
      </ADCarousel>
    </Col>
  );
};

export default Carousel;
