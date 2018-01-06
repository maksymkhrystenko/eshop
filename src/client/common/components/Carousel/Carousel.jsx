import React from 'react';
import { Carousel as ADCarousel, Col } from 'antd';
import type { Element } from 'react';

import styles from './styles.scss';

type Props = { images: Array<Object> };

const Carousel = ({ images }: Props): Element<'div'> => {
  const listOfImages = images.map(image => (
    <div key={image.id}>
      <img alt="" src={image.imageUrl} />
    </div>
  ));
  return (
    <Col className={styles.Carousel}>
      <ADCarousel
        customPaging={(i, img) => (
          <Col className={styles.Dot}>
            <img alt="" src={images[i].imageUrl} />
          </Col>
        )}
        effect="fade"
      >
        {listOfImages}
      </ADCarousel>
    </Col>
  );
};

export default Carousel;
