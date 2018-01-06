import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';

import {
  Table,
  Button,
  Col,
  PagesInfo,
  LoadMore,
  Link
} from '../../../common/components';

class UsersView extends React.PureComponent {
  state = {
    errors: []
  };

  handleDeleteUser = async (id, deleteUser) => {
    const result = await deleteUser(id);
    let errors = { errors: [] };
    if (result && result.errors) {
      errors = { errors: result.errors };
    }
    return errors;
  };

  orderBy = (e, name) => {
    const { onOrderBy, orderBy } = this.props;

    e.preventDefault();

    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({});
      }
    }

    return onOrderBy({ column: name, order });
  };

  renderOrderByArrow = name => {
    const { orderBy } = this.props;

    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      }
      return <span className="badge badge-primary">&#8593;</span>;
    }
    return <span className="badge badge-secondary">&#8645;</span>;
  };

  render() {
    const { loading, users, deleteUser, loadMoreRows } = this.props;
    const { errors } = this.state;

    const columns = [
      {
        title: (
          <Link onClick={e => this.orderBy(e, 'username')} to="#">
            Username {this.renderOrderByArrow('username')}
          </Link>
        ),
        dataIndex: 'username',
        key: 'username',
        render: (text, record) => (
          <Link className="user-link" to={`/users/${record.id}`}>
            {text}
          </Link>
        )
      },
      {
        title: (
          <Link onClick={e => this.orderBy(e, 'email')} to="#">
            Email {this.renderOrderByArrow('email')}
          </Link>
        ),
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: (
          <Link onClick={e => this.orderBy(e, 'role')} to="#">
            Role {this.renderOrderByArrow('role')}
          </Link>
        ),
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: (
          <Link onClick={e => this.orderBy(e, 'isActive')} to="#">
            Is Active {this.renderOrderByArrow('isActive')}
          </Link>
        ),
        dataIndex: 'isActive',
        key: 'isActive',
        render: text => text.toString()
      },
      {
        title: i18next.t('ACTIONS'),
        key: 'actions',
        render: (text, record) => (
          <Button
            color="primary"
            size="small"
            onClick={async () => {
              const res = await this.handleDeleteUser(record.id, deleteUser);
              this.setState(res);
            }}
          >
            {i18next.t('DELETE')}
          </Button>
        )
      }
    ];

    if (loading && !users) {
      return <div className="text-center">Loading...</div>;
    }
    return (
      <Col>
        {errors &&
          errors.map(error => (
            <div className="alert alert-danger" role="alert" key={error.field}>
              {error.message}
            </div>
          ))}
        <Table
          dataSource={users.edges.map(({ node }) => node)}
          columns={columns}
        />
        <Col>
          <PagesInfo
            countOfShowedItems={users.edges.length}
            totalCount={users.totalCount}
          />
        </Col>
        <Col>
          <LoadMore
            hasNextPage={users.pageInfo.hasNextPage}
            loadMoreRows={loadMoreRows}
          />
        </Col>
        {/*    {this.renderLoadMore(users, loadMoreRows)} */}
      </Col>
    );
  }
}

UsersView.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.object,
  orderBy: PropTypes.object,
  loadMoreRows: PropTypes.func.isRequired,
  onOrderBy: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

UsersView.defaultProps = {
  users: null,
  orderBy: null
};

export default UsersView;
