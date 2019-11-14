import React, { Component } from 'react';
import { Menu } from 'antd';
import { AuthConsumer } from '../context/AuthContext';

// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

export default class Header extends Component {
    state = {
        registerModalVisible: false,
        loginModalVisible: false
    };

    showRegisterModal = () => {
        this.setState({
            registerModalVisible: true,
        });
    };

    showLoginModal = () => {
        console.log('showLoginModal t')
        this.setState({
            loginModalVisible: true,
        });
    };

    hideRegisterModal = (value) => {
        this.setState({
            registerModalVisible: value,
        });

    };

    hideLoginModal = (value) => {
        this.setState({
            loginModalVisible: value,
        });

    };


    render() {
        return (
            <div>
                <header>
                    <AuthConsumer>
                        {({ isAuthenticated, updateAuthState, logout }) => (
                            <div>
                                <div className="logo" >Ping Pong {isAuthenticated}</div>

                                {isAuthenticated ? (
                                    <Menu className="menu"
                                        theme="dark"
                                        mode="horizontal"
                                        defaultSelectedKeys={['logout']}
                                    >
                                        <Menu.Item className="menu__item" key="logout" onClick={updateAuthState(false)}>Logout!</Menu.Item>
                                    </Menu>
                                ) : (
                                        <Menu className="menu"
                                            theme="dark"
                                            mode="horizontal"
                                            defaultSelectedKeys={['login']}
                                        >
                                            <Menu.Item className="menu__item" key="register" onClick={this.showRegisterModal}>Register</Menu.Item>
                                            <Menu.Item className="menu__item" key="login" onClick={this.showLoginModal}>Login</Menu.Item>
                                        </Menu>
                                    )}
                            </div>
                        )}
                    </AuthConsumer>
                </header>
                <RegisterModal registerModalVisible={this.state.registerModalVisible} hideRegisterModal={this.hideRegisterModal}></RegisterModal>
                <LoginModal loginModalVisible={this.state.loginModalVisible} hideLoginModal={this.hideLoginModal}></LoginModal>
            </div>
        )
    }
}
