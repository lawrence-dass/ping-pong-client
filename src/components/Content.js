import React, { Component } from 'react';
import { Layout, Menu, Button } from 'antd';

import './Content.scss'


// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';


const { Header, Footer } = Layout;

export default class Content extends Component {
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
            <Layout>
                <Header>
                    <div className="logo" >Ping Pong</div>
                    <Menu className="menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['login']}
                    >
                        <Menu.Item className="menu__item" key="register" onClick={this.showRegisterModal}>Register</Menu.Item>
                        <Menu.Item className="menu__item" key="login" onClick={this.showLoginModal}>Login</Menu.Item>
                    </Menu>
                </Header>
                <section className="hero">
                    <Button className="hero__ctaButton" type="primary" onClick={this.showLoginModal}> Book Table Now!</Button>
                </section>
                <Footer className='footer'> @Copyright Ping Pong LLC</Footer>
                <RegisterModal registerModalVisible={this.state.registerModalVisible} hideRegisterModal={this.hideRegisterModal}></RegisterModal>
                <LoginModal loginModalVisible={this.state.loginModalVisible} hideLoginModal={this.hideLoginModal}></LoginModal>
            </Layout>
        )
    }
}
