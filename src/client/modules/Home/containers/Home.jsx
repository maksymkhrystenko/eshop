/* @flow */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql, compose } from 'react-apollo';

import { PageLayout } from '../../../common/components';
import * as action from '../actions';
import type { Dispatch, Reducer } from '../../../common/types';
import styles from './styles.scss';
import PRODUCTS_QUERY from '../graphql/ProductsQuery.graphql';
import BestSellers from '../../../common/components/EShop/BestSellers';

// Export this for unit testing more easily
export class Home extends PureComponent {
  constructor(props) {
    super(props);
    console.log('Home');
  }

  render() {
    return (
      <PageLayout>
        <div className={styles.Home}>
          <Helmet title="Home" />
          <BestSellers countOfProductsPerRow={5} />
        </div>
      </PageLayout>
    );
  }
}

const HomeWithApollo = compose(
  graphql(PRODUCTS_QUERY, {
    options: () => ({
      variables: { limit: 10, offset: 0 },
      fetchPolicy: 'cache-and-network'
    }),
    props({ data: { loading, productsQuery } }) {
      return { loading, productsQuery };
    }
  })
)(Home);

const connector: Connector = connect(
  ({ home }: Reducer) => ({ home }),
  (dispatch: Dispatch) => ({
    fetchUsersIfNeeded: () => dispatch(action.fetchUsersIfNeeded())
  })
);

export default connector(HomeWithApollo);
