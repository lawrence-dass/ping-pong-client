import React, { Component } from 'react';
import { Layout, Button } from 'antd';

// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import '../styles/LandingPage.scss';

const { Footer } = Layout;

export default class LandingPage extends Component {
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
