import React, {Component} from 'react';
import {Input, Icon, Menu, Dropdown} from 'antd';
import i18next from 'i18next';

import {Col, Row, Label, Link} from '../../../components';
import styles from './styles.scss';

const Search = Input.Search;

const onClick = function ({key}) {
  console.log(`Click on item ${key}`);
};

const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">1st menu item</Menu.Item>
    <Menu.Item key="2">2nd memu item</Menu.Item>
    <Menu.Item key="3">3rd menu item</Menu.Item>
  </Menu>
);

export default class MainMenu extends Component {
  render() {
    return (
      <Row type="flex" align="middle" className={styles.TopMenu}>
        <Col className={styles.ContentWrapper}>
          <Col span={6}>
            <Col>
              <Row type="flex" align="middle">
                <Link className={styles.Logo} to={'/'}/>
              </Row>
            </Col>
          </Col>
          <Col span={9}>
            <Row>
              <Col span={22}>
                <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              </Col>
            </Row>
          </Col>
          <Col span={9}>
            <Row type="flex" align="middle">
              <Col className={styles.Contacts} span={14}>
                <Row type="flex" align="middle">
                  <Col span={8}>

                    <Col span={24}>
                      <Icon className={styles.PhoneImage} type="shake"/>
                    </Col>

                    <Col span={24} className={styles.PhoneImage}/>
                  </Col>
                  <Col span={16}>
                    <Row type="flex" align="middle" className={styles.Phones}>
                      <Col span={24}>
                        <Label>+38 (093) 453 44 53</Label>
                        <Label>+38 (067) 763 42 86</Label>
                        <Link to={'mailto:service@skills.com.ua'}>service@skills.com.ua</Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col className={styles.UserContainer} span={10}>
                <Row type="flex" align="middle">
                  <Col span={12}>
                    <Row type="flex" align="middle" className={styles.ActionBlock}>
                      <Link to={'#'}>
                        <Col span={24}> <Icon className={styles.ShoppingCartImage} type="shopping-cart"/></Col>
                        <Col span={24}> <Label>{i18next.t('TOP_MENU_CART')}</Label></Col>
                      </Link>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row type="flex" align="middle" className={styles.ActionBlock}>
                      <Link to={'#'}>
                        <Col span={24}> <Icon className={styles.AvatarImage} type="user"/></Col>
                        <Col span={24}>
                          <Dropdown overlay={menu}>
                            <Label className="ant-dropdown-link">
                              {i18next.t('TOP_MENU_MY_PROFILE')} <Icon type="down"/>
                            </Label>
                          </Dropdown>
                        </Col>
                      </Link>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    );
  }
}
