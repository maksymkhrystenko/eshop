import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import modules from '../../modules';

class NavBar extends React.PureComponent {
  state = {
    current: '/'
  };

  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Row gutter={8}>
        <Col span={14}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.props.location.pathname]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="/">
              <NavLink to="/" className="nav-link">
                eshop
              </NavLink>
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
            style={{ lineHeight: '64px', float: 'right' }}
          >
            {modules.navItemsRight}
            {__DEV__ && (
              <Menu.Item>
                <a href="/graphiql">GraphiQL</a>
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(NavBar);
