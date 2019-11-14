
import React, { Component } from 'react';
import { Modal, Form, Button, DatePicker, TimePicker, Slider, InputNumber, Row, Col } from 'antd';
import { Scheduler } from '@ssense/sscheduler';
import axios from 'axios';
import * as moment from 'moment';

const booking = new Scheduler();
const { confirm } = Modal;

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class BookingModal extends Component {
    state = {
        inputValue: 10,
        allBookings: [],
        bookedSlots: []
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
        axios.get('http://localhost:8080/getBookings')
            .then(res => {
                const bookedSlots = res.data.result.map((item) => {
                    return { date: item.date, from: item.startTime, to: item.endTime };
                })
                this.setState(() => {
                    return { allBookings: res.data.result, bookedSlots: bookedSlots };
                })
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response)
                    this.setState(() => {
                        return { errors: [...err.response.data] }
                    })
                }

            })

        if (this.state.allBookings != []) {

        }


    }



    handleSubmitForBooking = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const payload = {
                    userId: '12345',
                    date: values['date'].format('YYYY-MM-DD'),
                    startTime: values['startTime'].format('HH:mm'),
                    endtime: values['startTime'].add(this.state.inputValue, 'minutes').format('HH:mm'),
                    duration: this.state.inputValue,
                    createAt: moment().format('LLLL')
                }

                console.log('payload', payload);
                axios.post('http://localhost:8080/book', payload)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        if (err.response) {
                            console.log(err.response)
                            this.setState(() => {
                                return { errors: [...err.response.data] }
                            })
                        }

                    })
                console.log(this.state);
            }
            this.props.form.resetFields()
            this.props.hideBookingModal(false);
        });
    };

    checkBookingAvaiablity = e => {
        console.log('checkBookingAvaiablity t');
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('inside prop validation');
            console.log('err', err, 'value', values)
            console.log(typeof values['startTime'])
            if (!err) {
                let selectedTime = moment(values['startTime']);
                const payload = {
                    userId: '12345',
                    date: values['date'].format('YYYY-MM-DD'),
                    startTime: values['startTime'].format('HH:mm'),
                    endtime: selectedTime.add(this.state.inputValue, 'minutes').format('HH:mm'),
                    duration: this.state.inputValue,
                    createAt: moment().format('LLLL')
                }
                console.log('payload', payload);
            } else {
                console.log(err);
            }
            const availability = booking.getAvailability({
                from: values['date'].format('YYYY-MM-DD'),
                to: values['date'].add('days', 1).format('YYYY-MM-DD'),
                duration: parseInt(this.state.inputValue),
                interval: parseInt(this.state.inputValue),
                schedule: {
                    weekdays: {
                        from: values['startTime'].format('HH:mm'), to: '23:00'
                    },
                    unavailability: this.state.bookedSlots,
                    allocated: [
                    ]
                }
            });
            console.log('availability', availability);
            const avaiablityArray = availability != {} && Object.values(availability)[0];
            for (let i of avaiablityArray) {
                if (values['startTime'].format('HH:mm') === i.time) {
                    if (i.available === true) {
                        console.log('avaiable')
                        this.showConfirmBooking(this.props, this.state);
                        return true;
                    }
                    console.log('unavailable');
                    return false;
                }
                return false;
            }
            this.props.form.resetFields()
            this.props.hideBookingModal(false);
        });
    }

    showConfirmBooking = () => {
        console.log('should t showConfirmBooking');
        confirm({
            title: 'Nice, your selected time slot is avaiable!',
            content: 'Would like confirm your booking?',
            icon: "check-circle",
            onOk: () => {
                this.props.form.validateFields((err, values) => {
                    if (!err) {
                        const selectedTime = moment(values['startTime']);
                        console.log()
                        const payload = {
                            id: '12345',
                            date: values['date'].format('YYYY-MM-DD'),
                            startTime: values['startTime'].format('HH:mm'),
                            endTime: selectedTime.add(this.state.inputValue, 'minutes').format('HH:mm'),
                            duration: this.state.inputValue,
                            createdAt: moment().format('LLLL')
                        }

                        console.log('payload', payload);
                        axios.post('http://localhost:8080/book', payload)
                            .then(res => {
                                console.log('this.state.allBookings', this.state.allBooking);
                                let updatedallBooking = [...this.state.allBookings];
                                console.log('updatedallBooking before push', updatedallBooking);
                                updatedallBooking.push(res.data.result);
                                console.log('updatedallBooking', updatedallBooking);
                                this.setState(() => {
                                    console.log('called set state');
                                    return { allBooking: updatedallBooking };
                                })
                            })
                            .catch(err => {
                                if (err.response) {
                                    console.log(err.response)
                                    this.setState(() => {
                                        return { errors: [...err.response.data] }
                                    })
                                }

                            })
                    }
                    this.props.form.resetFields()
                    this.props.hideBookingModal(false);
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        }).apply(this);
    }

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
                email: '',
                password: '',
            };
        })
        this.props.form.resetFields();
        this.props.hideBookingModal(false);
    };

    onChange = value => {
        this.setState({
            inputValue: value
        });
    };


    render() {
        console.log(this.props)
        const { inputValue } = this.state;
        const { bookingModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const dateError = isFieldTouched('date') && getFieldError('date');
        const timeError = isFieldTouched('startTime') && getFieldError('startTime');
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const dateConfig = {
            rules: [{ type: 'object', required: true, message: 'Please select date.' }],
        };
        const timeConfig = {
            rules: [{ type: 'object', required: true, message: 'Please select time.' }],
        };
        return (
            <div>
                <Modal
                    visible={bookingModalVisible}
                    title="Please fill up details to make a fresh reservation."
                    onCancel={this.handleCancel}
                    footer={null}
                    style={{ top: 200 }}
                >
                    <Form {...formItemLayout} onSubmit={this.checkBookingAvaiablity}>
                        <Form.Item label="Booking date" validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
                            {getFieldDecorator('date', dateConfig)(<DatePicker />)}
                        </Form.Item>
                        <Form.Item label="Duration (mins)">
                            <Row>
                                <Col span={12}>
                                    <Slider
                                        min={10}
                                        max={60}
                                        onChange={this.onChange}
                                        value={typeof inputValue === "number" ? inputValue : 0}
                                    />
                                </Col>
                                <Col span={4}>
                                    <InputNumber
                                        min={10}
                                        max={60}
                                        style={{ marginLeft: 16 }}
                                        value={inputValue}
                                        onChange={this.onChange}
                                    />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item label="Start Time" validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                            {getFieldDecorator('startTime', timeConfig)(<TimePicker />)}
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                xs: { span: 24, offset: 0 },
                                sm: { span: 16, offset: 8 },
                            }}
                        >
                            <Button type="primary" disabled={hasErrors(getFieldsError())} htmlType="submit">Check availability</Button>
                            {/* <Button type="primary" disabled={hasErrors(getFieldsError())} htmlType="submit">Submit</Button> */}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedBookingModal = Form.create({ name: 'normal_register' })(BookingModal);

export default WrappedBookingModal;