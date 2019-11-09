import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

class RegisterModal extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    handleSubmitForRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://localhost:8080/register', {
                    "userName": values.name,
                    "email": values.email,
                    "password": values.password,
                })
            }
            this.props.hideRegisterModal(false);
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
        this.props.hideRegisterModal(false);
    };

    render() {
        console.log(this.props)
        const { registerModalVisible } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    visible={registerModalVisible}
                    title="Please fill up below detail to register with us."
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmitForRegister} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter your name.' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Name"
                                />,
                            )}
                        </Form.Item>
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

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                             </Button>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedRegisterModal = Form.create({ name: 'normal_register' })(RegisterModal);

export default WrappedRegisterModal;