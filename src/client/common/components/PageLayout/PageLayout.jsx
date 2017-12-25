import React from 'react';
import PropTypes from 'prop-types';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import {Layout} from 'antd';

import styles from './styles.scss';
import NavBar from '../NavBar';
import {Col} from '../../components';
import TopMenu from '../EShop/TopMenu';

const {Header, Content, Footer} = Layout;

const PageLayout = ({children, navBar}) => {
  return (
    <LocaleProvider locale={enUS}>
      <Layout>
        <Header className={styles.Header}>
          <TopMenu/>
          {navBar !== false && <NavBar/>}
        </Header>
        <Content id="content" className={styles.Content}>
          <Col className={styles.ContentWrapper}>
            {children}
          </Col>
        </Content>
        <Footer style={{textAlign: 'center'}}>&copy; 2017. eshop.</Footer>
      </Layout>
    </LocaleProvider>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
