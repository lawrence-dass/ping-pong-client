import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    handleSubmitForLogin = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
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
        this.props.hideLoginModal(false);
    };

    render() {
        console.log(this.props)
        const { loginModalVisible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    visible={loginModalVisible}
                    title="Please login to access your account."
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmitForLogin} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ type: "email", required: true, message: 'Please input your Email address!' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email address"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <span>register now!</span>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedLoginModal = Form.create({ name: 'normal_login' })(LoginModal);

export default WrappedLoginModal;