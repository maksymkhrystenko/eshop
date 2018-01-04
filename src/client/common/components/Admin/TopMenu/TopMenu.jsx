import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as $ from 'jquery';
import PropTypes from 'prop-types';
import './styles.scss';

class TopMenu extends Component {
  signOut() {
    const {history} = this.props;
/*    $.ajax({
      url: '/signout',
      type: 'POST',
      data: {},
      success: (res) => {
        if (res.status === 200) {
          console.log('--------');
          console.log(res);
          //   window.localStorage.setItem('jwt', res.token);
          history.push('/');
        }
      },
      error: (err) => {
        console.log(err.responseText);
      }
    });*/
  }

  userItemClick() {
    $('.main-menu-dropdown').css('display', 'none');
  }

  userItemEnter() {
    $('.main-menu-dropdown').css('display', 'block');
  }

  userItemLeave() {
    $('.main-menu-dropdown').css('display', 'none');
  }

  render() {
    const {user} = this.props;
    return (
      <div className="admin-top-menu">
        <div className="container display-flex">
          <Link className="logo-link" to={'/'}>
            <div className="logo"></div>
          </Link>
          <div className="search-container">
            <input className="search-filed" placeholder="Поиск по сайту..." type="text"/>
            <button className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
          </div>
          <ul className="menu-items">
            <li><div className="comments-block"></div></li>
            <li><div className="requests-block"></div></li>
            <li><div className="messages-block"></div></li>
            <li>
              {user&&user.userName &&
              (<div className="user-profile-container">
                <div className="visible-item">
                  <div className="user-avatar"></div> {user.userName}
                </div>
                <div className="main-menu-dropdown">
                  <div className="dropdown-item">
                    <i className="fa fa-user-circle"></i> <Link to={`/user/${user.uid}`}>Личный кабинет</Link>
                  </div>
                  <div className="dropdown-item">
                    <i className="fa fa-sign-out"></i> <span className="regular-link"
                                                             onClick={this.signOut.bind(this)}>Выйти из аккаунта</span>
                  </div>
                </div>
              </div>)
              }
              {(!user||!user.userName) &&
              (<div className="user-profile-container" onMouseEnter={this.userItemEnter.bind(this)}
                    onMouseLeave={this.userItemLeave.bind(this)}>
                <div className="visible-item">
                  <i className="fa fa-sign-in"></i> <Link onClick={this.userItemClick.bind(this)} to={`/user-sign-in`}>
                  Авторизация пользователя
                </Link>
                </div>
                <div className="main-menu-dropdown">
                  <div className="dropdown-item">
                    <i className="fa fa-user-plus"></i> <Link onClick={this.userItemClick.bind(this)}
                                                              to={`/user-sign-up`}>
                    Регистрация пользователя
                  </Link>
                  </div>
                </div>
                <div className="clearfix"></div>
              </div>)
              }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

TopMenu.propTypes = {
  history: PropTypes.any,
  user: PropTypes.object,
};

export default connect(
  (state) => {
    return {user: state.user};
  }
)(TopMenu);
