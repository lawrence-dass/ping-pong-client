import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';
import { connect } from 'react-redux';

// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { alertActions } from '../_actions';
import { history } from '../_helpers';
import '../styles/LandingPage.scss';

const { Footer } = Layout;

class LandingPage extends Component {
  state = {
    registerModalVisible: false,
    loginModalVisible: false
  };

  componentDidUpdate() {
    if (this.props.alertType === 'alert-success') {
      this.registerSuccessInfo();
    } else if (this.props.alertMessage === 'User Exists') {
      this.registerFailureInfo();
    } else if (this.props.alertMessage === 'Authentication error') {
      this.loginFailureInfo();
    } else if (this.props.alertMessage === 'Internal Error') {
      this.generalFailureInfo();
    } else {
      //   this.generalFailureInfo();
    }
  }

  registerSuccessInfo() {
    Modal.info({
      title: 'Awesome, you register successfully',
      content: (
        <div>
          <p>
            We have sent you a confirmation email. And you may login to start
            using out service.
          </p>
        </div>
      ),
      onOk: () => {
        this.props.alertClear();
        history.push('/login');
      }
    });
  }

  registerFailureInfo() {
    Modal.info({
      title:
        'Username/email already taken, please try different username/email.',
      content: (
        <div>
          <p>If you have registered already, please login to continue.</p>
        </div>
      ),
      onOk() {}
    });
  }

  loginFailureInfo() {
    Modal.info({
      title: 'Authentication Issue',
      content: (
        <div>
          <p>
            Username or password did not match, please enter correct Username
            and password.
          </p>
          <p>
            If you haven't registered already, please register to create new
            user.
          </p>
        </div>
      ),
      onOk() {}
    });
  }

  generalFailureInfo() {
    Modal.info({
      title: 'Opps, something went wrong in processing your request.',
      content: (
        <div>
          <p>Please try after sometime or contact us for any urgent support.</p>
        </div>
      ),
      onOk() {}
    });
  }

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
    return (
      <Layout>
        <section className="hero">
          <Button
            className="hero__ctaButton"
            type="primary"
            onClick={this.showLoginModal}
          >
            {' '}
            Book Table Now!
          </Button>
        </section>
        <Footer className="footer"> @Copyright Ping Pong LLC</Footer>
        <RegisterModal
          registerModalVisible={this.state.registerModalVisible}
          hideRegisterModal={this.hideRegisterModal}
        ></RegisterModal>
        <LoginModal
          loginModalVisible={this.state.loginModalVisible}
          hideLoginModal={this.hideLoginModal}
        ></LoginModal>
      </Layout>
    );
  }
}

// store state to component props
function mapState(state) {
  const { type, message } = state.alert;
  return { alertType: type, alertMessage: message };
}

// action required for register functionality
const actionCreators = {
  alertClear: alertActions.clear
};

const connectedLandingPage = connect(mapState, actionCreators)(LandingPage);

export default connectedLandingPage;
