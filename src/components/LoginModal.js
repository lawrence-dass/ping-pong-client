import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

React.createContext()
class LoginModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmitForLogin = e => {
        console.log('handleSubmitForLogin t');
        e.preventDefault();
        this.props.form.validateFields((err, { username, password }) => {
            if (!err) {
                this.props.login(username, password);
            }
            this.props.form.resetFields();
            this.props.hideLoginModal(false);
        });
    };

    onNameInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { name: value }
        })
    }

    onEmailInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { email: value }
        })
    }
    onPasswordInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { password: value }
        })
    }

    handleCancel = () => {
        this.setState(() => {
            return {
                username: '',
                password: '',
            };
        })
        this.props.form.resetFields();
        this.props.hideLoginModal(false);
    };

    render() {
        const { loginModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const usernameError = isFieldTouched('name') && getFieldError('name');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Modal
                visible={loginModalVisible}
                title="Please login to access your account."
                onCancel={this.handleCancel}
                footer={null}
                style={{ top: 200 }}
            >
                <Form onSubmit={this.handleSubmitForLogin} className="login-form">
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please enter your Username.' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password.' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="login-form-button">
                        Log in</Button>
                </Form>
            </Modal>
        )
    }
}

const WrappedLoginModal = Form.create({ name: 'normal_login' })(LoginModal);

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginModal = connect(mapState, actionCreators)(WrappedLoginModal);
export default connectedLoginModal;