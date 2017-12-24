/* @flow */

import React, {PureComponent} from 'react';
import type {Element} from 'react';
import {connect} from 'react-redux';
import type {Connector} from 'react-redux';
import Helmet from 'react-helmet';
import {NavLink, Link} from 'react-router-dom';
import {graphql, compose} from 'react-apollo';
import {Label, Button} from '../../../common/components';
import * as action from '../actions';
import type {Home as HomeType, Dispatch, Reducer} from '../../../common/types';
import UserList from '../components/UserList';
//import './styles.scss';
import styles from './styles.scss';
import PRODUCTS_QUERY from '../graphql/ProductsQuery.graphql';

import {Menu, Dropdown, Icon} from 'antd';

type Props = { home: HomeType, fetchUsersIfNeeded: () => void };


// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchUsersIfNeeded();
  }

  renderUserList = (): Element<'p' | typeof UserList> => {
    const {home} = this.props;

    if (
      !home.readyStatus ||
      home.readyStatus === 'USERS_INVALID' ||
      home.readyStatus === 'USERS_REQUESTING'
    ) {
      return <p>Loading...</p>;
    }

    if (home.readyStatus === 'USERS_FAILURE') {
      return <p>Oops, Failed to load list!</p>;
    }

    return <UserList list={home.list}/>;
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.Home}>
        <Helmet title="Home"/>
        <NavLink className="btn btn-primary" to="/register" activeClassName="active" style={{margin: 10}}>
          Sign Up
        </NavLink>
        <div className={styles.Nigga}>test</div>
        <Label>comment</Label>
        <Button>Click to increase counter3</Button>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            Hover me <Icon type="down"/>
          </a>
        </Dropdown>
        {this.renderUserList()}
      </div>
    );
  }
}

const HomeWithApollo = compose(
  graphql(PRODUCTS_QUERY, {
    options: () => {
      return {
        variables: {limit: 10, offset: 0},
        fetchPolicy: 'cache-and-network'
      };
    },
    props({data: {loading, productsQuery}}) {
      return {loading, productsQuery};
    }
  })
)(Home);

const connector: Connector<{}, Props> = connect(
  ({home}: Reducer) => ({home}),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded())
  })
);

export default connector(HomeWithApollo);
