import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Icon, Menu, Dropdown } from 'antd';
import i18next from 'i18next';

import { Col, Row, Link } from '../../components';
import SubMenu from './SubMenu';
import styles from './styles.scss';
import modules from '../../../modules';

const menu = (
  <Menu>
    <Menu.Item>1st menu item</Menu.Item>
    <Menu.Item>2nd menu item</Menu.Item>
    <SubMenu title="sub menu">
      <Menu.Item>3rd menu item</Menu.Item>
      <Menu.Item>4th menu item</Menu.Item>
    </SubMenu>
    <SubMenu title="sub menu">
      <Menu.Item>5d menu item</Menu.Item>
      <Menu.Item>6th menu item</Menu.Item>
    </SubMenu>
  </Menu>
);

class NavBar extends React.PureComponent {
  handleClick = () => {
    console.log('handleClick');
  };

  render() {
    return (
      <Row className={styles.NavBar}>
        <Col className={styles.ContentWrapper}>
          <Col span={14}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              theme="dark"
              className={styles.Menu}
            >
              <Menu.Item key="/">
                <NavLink to="/" className="nav-link">
                  {i18next.t('NAVBAR_MENU_MAIN')}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/categories">
                <Dropdown overlay={menu}>
                  <Link className="ant-dropdown-link" to="#">
                    {i18next.t('NAVBAR_MENU_CATEGORIES')} <Icon type="down" />
                  </Link>
                </Dropdown>
              </Menu.Item>
              {modules.navItems}
            </Menu>
          </Col>
          <Col span={10}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.props.location.pathname]}
              mode="horizontal"
              theme="dark"
              className={styles.RightMenu}
            >
              {modules.navItemsRight}
              <Menu.Item>
                <a href="/graphiql">GraphiQL</a>
              </Menu.Item>
            </Menu>
          </Col>
        </Col>
      </Row>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
