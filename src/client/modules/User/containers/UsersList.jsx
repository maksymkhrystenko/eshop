import React from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';

import UsersListView from '../components/UsersListView';
import USERS_QUERY from '../graphql/UsersQuery.graphql';
import DELETE_USER from '../graphql/DeleteUser.graphql';
import settings from '../../../config';

class UsersList extends React.PureComponent {
  render() {
    return <UsersListView {...this.props} />;
  }
}

const UsersListWithApollo = compose(
  graphql(USERS_QUERY, {
    options: ({orderBy, searchText, role, isActive}) => {
      return {
        fetchPolicy: 'cache-and-network',
        variables: {
          orderBy: orderBy,
          filter: {searchText, role, isActive},
          limit: settings.app.paginationLength,
          offset: 0
        }
      };
    },
    props({data: {loading, users, refetch, error, fetchMore}}) {
      const loadMoreRows = () => {
        return fetchMore({
          variables: {
            offset: users.edges.length
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            const totalCount = fetchMoreResult.users.totalCount;
            const newEdges = fetchMoreResult.users.edges;
            const pageInfo = fetchMoreResult.users.pageInfo;

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              users: {
                totalCount,
                edges: [...previousResult.users.edges, ...newEdges],
                pageInfo,
                __typename: 'Users'
              }
            };
          }
        });
      };
      return {loadMoreRows, loading, users, refetch, errors: error ? error.graphQLErrors : null};
    }
  }),
  graphql(DELETE_USER, {
    props: ({ownProps: {refetch}, mutate}) => ({
      deleteUser: async id => {
        try {
          const {data: {deleteUser}} = await mutate({
            variables: {id}
          });

          // refeatch USERS_QUERY
          refetch();

          if (deleteUser.errors) {
            return {errors: deleteUser.errors};
          }
        } catch (e) {
          console.log(e.graphQLErrors);
        }
      }
    })
  })
)(UsersList);

export default connect(
  state => ({
    searchText: state.user.searchText,
    role: state.user.role,
    isActive: state.user.isActive,
    orderBy: state.user.orderBy
  }),
  dispatch => ({
    onOrderBy(orderBy) {
      dispatch({
        type: 'USER_ORDER_BY',
        value: orderBy
      });
    }
  })
)(UsersListWithApollo);
