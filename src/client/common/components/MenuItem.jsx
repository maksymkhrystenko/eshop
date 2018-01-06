import React from 'react';
import PropTypes from 'prop-types';
import Menu from 'antd/lib/menu';

class MenuItem extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;
    return <Menu.Item {...props}>{children}</Menu.Item>;
  }
}

MenuItem.propTypes = {
  children: PropTypes.node
};

MenuItem.defaultProps = {
  children: null
};

export default MenuItem;
