import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';

// internal imports
import { userActions } from '../_actions';
import '../styles/RegisterModal.scss';

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegisterModal extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }


    handleSubmitForRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, { name, email, password }) => {
            if (!err) {
                this.props.register({ name, email, password })
            }
            this.props.form.resetFields()
            this.props.hideRegisterModal(false);
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
                email: '',
                password: '',
            };
        })
        this.props.form.resetFields();
        this.props.hideRegisterModal(false);
    };


    render() {
        const { registerModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const usernameError = isFieldTouched('name') && getFieldError('name');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Modal
                visible={registerModalVisible}
                title="Please fill up below details to register with us."
                onCancel={this.handleCancel}
                footer={null}
                style={{ top: 200 }}
            >
                <Form onSubmit={this.handleSubmitForRegister} className="register-form">
                    <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please enter your name.' }, { min: 4, max: 10, message: 'Username must between 4 to 10 characters.' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                        {getFieldDecorator('email', {
                            rules: [{ type: "email", required: true, message: 'Please input your Email address!' }],
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Email address"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' },
                            { min: 6, message: 'Password must atleast 6 characters.' },
                            { max: 25, message: 'Password cannot exceed 25 characters.' }],
                        })(
                            <Input.Password
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="register-form-button">Register</Button>
                </Form>
            </Modal>
        )
    }
}

// antd form wrapper
const WrappedRegisterModal = Form.create({ name: 'normal_register' })(RegisterModal);


// action required for register functionality
const actionCreators = {
    register: userActions.register
}

const connectedRegisterModal = connect(null, actionCreators)(WrappedRegisterModal);

export default connectedRegisterModal;
