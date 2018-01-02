import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Table, Button, Col} from '../../../common/components';
import {SubmissionError} from "redux-form";

export default class UsersView extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.object,
    orderBy: PropTypes.object,
    loadMoreRows: PropTypes.func.isRequired,
    onOrderBy: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
  };

  state = {
    errors: []
  };

  handleDeleteUser = async (id, deleteUser) => {
    const result = await deleteUser(id);
    let errors = {errors: []};
    if (result && result.errors) {
      errors = {errors: result.errors};
    }
    return errors;
  };


  renderOrderByArrow = name => {
    const {orderBy} = this.props;

    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };

  orderBy = (e, name) => {
    const {onOrderBy, orderBy} = this.props;

    e.preventDefault();

    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({});
      }
    }

    return onOrderBy({column: name, order});
  };

  renderLoadMore = (users, loadMoreRows) => {
    if (users.pageInfo.hasNextPage) {
      return (
        <Button id="load-more" color="primary" onClick={loadMoreRows}>
          Load more ...
        </Button>
      );
    }
  };

  render() {
    const {loading, users, deleteUser, loadMoreRows} = this.props;
    const {errors} = this.state;

    const columns = [
      {
        title: (
          <a onClick={e => this.orderBy(e, 'username')} href="#">
            Username {this.renderOrderByArrow('username')}
          </a>
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
          <a onClick={e => this.orderBy(e, 'email')} href="#">
            Email {this.renderOrderByArrow('email')}
          </a>
        ),
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: (
          <a onClick={e => this.orderBy(e, 'role')} href="#">
            Role {this.renderOrderByArrow('role')}
          </a>
        ),
        dataIndex: 'role',
        key: 'role'
      },
      {
        title: (
          <a onClick={e => this.orderBy(e, 'isActive')} href="#">
            Is Active {this.renderOrderByArrow('isActive')}
          </a>
        ),
        dataIndex: 'isActive',
        key: 'isActive',
        render: text => text.toString()
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <Button color="primary" size="small" onClick={async () => {
            let res = await this.handleDeleteUser(record.id, deleteUser);
            this.setState(res)
          }}>
            Delete
          </Button>
        )
      }
    ];

    if (loading && !users) {
      return <div className="text-center">Loading...</div>;
    } else {
      return (
        <Col>
          {errors &&
          errors.map(error => (
            <div className="alert alert-danger" role="alert" key={error.field}>
              {error.message}
            </div>
          ))}
          <Table dataSource={users.edges.map(({node}) => node)} columns={columns}/>
          <Col>
            <small>
              ({users.edges.length} / {users.totalCount})
            </small>
          </Col>
          {this.renderLoadMore(users, loadMoreRows)}
        </Col>
      );
    }
  }
}
