import React, {Component} from 'react';
import {Link} from '../../components';
import {Breadcrumb, Col} from 'antd';
import i18next from 'i18next';

import styles from './styles.scss';

export default class BreadCrumbs extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Col className={styles.BreadCrumbs}>
        <Breadcrumb>
          <Breadcrumb.Item><Link to={'/'}>{i18next.t('NAVBAR_MENU_MAIN')}</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'#'}>{i18next.t('NAVBAR_MENU_CATEGORIES')}</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={'#'}>{i18next.t('NAVBAR_MENU_PRODUCTS')}</Link></Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    );
  }
}
