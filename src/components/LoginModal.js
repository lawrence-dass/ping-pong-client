import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

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
        console.log('handleSubmitForLogin t')
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://localhost:8080/login', {
                    "username": 'newton',
                    "password": values.password,
                })
            }
            this.props.form.resetFields();
            this.props.hideLoginModal(false);
        });
    };

    onNameInputChange = e => {
        const { value } = e.target;
        console.log(value)
        this.setState(() => {
            return { name: value }
        })
    }

    onEmailInputChange = e => {
        const { value } = e.target;
        console.log(value)
        this.setState(() => {
            return { email: value }
        })
    }
    onPasswordInputChange = e => {
        const { value } = e.target;
        console.log(value)
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
        console.log(this.props)
        const { loginModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const usernameError = isFieldTouched('name') && getFieldError('name');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
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
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>

                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="login-form-button">
                            Log in
                            </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedLoginModal = Form.create({ name: 'normal_login' })(LoginModal);

export default WrappedLoginModal;