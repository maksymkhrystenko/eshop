import React from 'react';
import { Breadcrumb, Col } from 'antd';
import i18next from 'i18next';

import { Link } from '../../components';
import styles from './styles.scss';

const BreadCrumbs = () => (
  <Col className={styles.BreadCrumbs}>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">{i18next.t('NAVBAR_MENU_MAIN')}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="#">{i18next.t('NAVBAR_MENU_CATEGORIES')}</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="#">{i18next.t('NAVBAR_MENU_PRODUCTS')}</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
  </Col>
);

export default BreadCrumbs;
