import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Link } from 'react-router-dom';

import { ReactComponent as PingPongLogo } from '../assets/racket.svg';

// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import '../styles/Header.scss';

class Header extends Component {
  state = {
    registerModalVisible: false,
    loginModalVisible: false
  };

  showRegisterModal = () => {
    this.setState({
      registerModalVisible: true
    });
  };

  showLoginModal = () => {
    this.setState({
      loginModalVisible: true
    });
  };

  hideRegisterModal = value => {
    this.setState({
      registerModalVisible: value
    });
  };

  hideLoginModal = value => {
    this.setState({
      loginModalVisible: value
    });
  };

  render() {
    const logo_icon = {
      width: '40px',
      height: '40px',
      marginRight: '10px',
      display: 'inline-block'
    };
    return (
      <div>
        {this.props.loggedIn ? (
          <header>
            <div className="logo">
              <span>
                <PingPongLogo style={logo_icon} />
              </span>
              <span>Ping Pong</span>
            </div>
            <Menu className="menu" theme="dark" mode="horizontal">
              <Menu.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item
                className="menu__item"
                key="logout"
                onClick={this.props.logout}
              >
                Logout
              </Menu.Item>
            </Menu>
          </header>
        ) : (
          <header>
            <div className="logo">
              <PingPongLogo style={logo_icon} />
              <span>Ping Pong</span>
            </div>
            <Menu
              className="menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['login']}
            >
              <Menu.Item
                className="menu__item"
                key="register"
                onClick={this.showRegisterModal}
              >
                Register
              </Menu.Item>
              <Menu.Item
                className="menu__item"
                key="login"
                onClick={this.showLoginModal}
              >
                Login
              </Menu.Item>
            </Menu>
          </header>
        )}
        <RegisterModal
          registerModalVisible={this.state.registerModalVisible}
          hideRegisterModal={this.hideRegisterModal}
        ></RegisterModal>
        <LoginModal
          loginModalVisible={this.state.loginModalVisible}
          hideLoginModal={this.hideLoginModal}
        ></LoginModal>
      </div>
    );
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  logout: userActions.logout
};

const connectedHeader = connect(mapState, actionCreators)(Header);

export default connectedHeader;
