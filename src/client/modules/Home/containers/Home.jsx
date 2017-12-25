/* @flow */

import React, {PureComponent} from 'react';
import type {Element} from 'react';
import {connect} from 'react-redux';
import type {Connector} from 'react-redux';
import Helmet from 'react-helmet';
import {NavLink, Link} from 'react-router-dom';
import {graphql, compose} from 'react-apollo';
import {Label, Button, PageLayout} from '../../../common/components';
import * as action from '../actions';
import type {Home as HomeType, Dispatch, Reducer} from '../../../common/types';
//import './styles.scss';
import styles from './styles.scss';
import PRODUCTS_QUERY from '../graphql/ProductsQuery.graphql';

import {Menu, Dropdown, Icon} from 'antd';
import BestSellers from '../components/BestSellers';

type Props = { home: HomeType };


// Export this for unit testing more easily
export class Home extends PureComponent<Props> {
  render() {
    return (
      <PageLayout>
      <div className={styles.Home}>
        <Helmet title="Home"/>
        <BestSellers />
      </div>
      </PageLayout>
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
