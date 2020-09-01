import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
  DatePicker,
  TimePicker,
  Slider,
  InputNumber,
  Row,
  Col
} from 'antd';
import { Scheduler } from '@ssense/sscheduler';
import * as moment from 'moment';
import { connect } from 'react-redux';

import { bookingActions } from '../_actions';

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

  checkBookingAvailability = e => {
    e.preventDefault();
    // all the booked slots
    const allBookedSlot = this.props.allBookings.bookings.map(booking => {
      return {
        date: booking.date,
        from: booking.startTime,
        to: booking.endTime
      };
    });

    // avoid booking 60 mins before or after on already booked slot by individual user
    const myBookedSlotsPlusBuffer = [];
    this.props.allBookings.bookings.forEach(booking => {
      const userId = localStorage.getItem('userId');
      const sixtyMinsBeforeStartTime = moment(
        `${booking.date}, ${booking.startTime}`
      )
        .subtract('60', 'minutes')
        .format('HH:mm');
      const sixtyMinsAfterEndTime = moment(
        `${booking.date}, ${booking.startTime}`
      )
        .add('60', 'minutes')
        .format('HH:mm');
      if (userId === `"${booking.id}"`) {
        myBookedSlotsPlusBuffer.push({
          date: booking.date,
          from: sixtyMinsBeforeStartTime,
          to: sixtyMinsAfterEndTime
        });
      }
    });

    this.props.form.validateFields((err, values) => {
      const selectedDate = moment(values['date']);
      const availability = booking.getAvailability({
        from: values['date'].format('YYYY-MM-DD'),
        to: selectedDate.add('days', 1).format('YYYY-MM-DD'),
        duration: parseInt(this.state.inputValue),
        interval: parseInt(this.state.inputValue),
        schedule: {
          weekdays: {
            from: values['startTime'].format('HH:mm'),
            to: '23:00'
          },
          unavailability: [...allBookedSlot, ...myBookedSlotsPlusBuffer],
          allocated: []
        }
      });
      const availabilityArray =
        availability !== {} && Object.values(availability)[0];
      for (let i of availabilityArray) {
        if (values['startTime'].format('HH:mm') === i.time) {
          if (i.available === true) {
            this.showConfirmBooking(this.props, this.state);
            return true;
          }
          this.noSlotAvaiable();
          return false;
        }
        return false;
      }
      this.props.form.resetFields();
      this.props.hideBookingModal(false);
    });
  };

  showConfirmBooking = () => {
    confirm({
      title: 'Nice, your selected time slot is avaiable!',
      content: 'Would like confirm your booking?',
      icon: 'check-circle',
      onOk: () => {
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const selectedTime = moment(values['startTime']);
            const payload = {
              id: this.props.user.userDetails.userId,
              date: values['date'].format('YYYY-MM-DD'),
              startTime: values['startTime'].format('HH:mm'),
              endTime: selectedTime
                .add(this.state.inputValue, 'minutes')
                .format('HH:mm'),
              duration: this.state.inputValue,
              createdAt: moment().format('LLLL')
            };
            this.props.addBooking(payload);
          }
          this.props.form.resetFields();
          this.props.hideBookingModal(false);
        });
      },
      onCancel() {
        // do nothing
      }
    }).apply(this);
  };

  noSlotAvaiable = () => {
    Modal.error({
      title: 'Oops',
      content:
        'Your selected slot is not avaiable, please try different time slots'
    });
  };

  onNameInputChange = e => {
    const { value } = e.target;
    this.setState(() => {
      return { name: value };
    });
  };

  onEmailInputChange = e => {
    const { value } = e.target;
    this.setState(() => {
      return { email: value };
    });
  };
  onPasswordInputChange = e => {
    const { value } = e.target;
    this.setState(() => {
      return { password: value };
    });
  };

  handleCancel = () => {
    this.setState(() => {
      return {
        username: '',
        email: '',
        password: ''
      };
    });
    this.props.form.resetFields();
    this.props.hideBookingModal(false);
  };

  onChange = value => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue } = this.state;
    const { bookingModalVisible } = this.props;
    const {
      getFieldDecorator,
      getFieldsError,
      isFieldTouched,
      getFieldError
    } = this.props.form;
    const dateError = isFieldTouched('date') && getFieldError('date');
    const timeError = isFieldTouched('startTime') && getFieldError('startTime');
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const dateConfig = {
      rules: [
        { type: 'object', required: true, message: 'Please select date.' }
      ]
    };
    const timeConfig = {
      rules: [
        { type: 'object', required: true, message: 'Please select time.' }
      ]
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
          <Form {...formItemLayout} onSubmit={this.checkBookingAvailability}>
            <Form.Item
              label="Booking date"
              validateStatus={dateError ? 'error' : ''}
              help={dateError || ''}
            >
              {getFieldDecorator('date', dateConfig)(<DatePicker />)}
            </Form.Item>
            <Form.Item label="Duration (mins)">
              <Row>
                <Col span={12}>
                  <Slider
                    min={10}
                    max={60}
                    onChange={this.onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
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
            <Form.Item
              label="Start Time"
              validateStatus={timeError ? 'error' : ''}
              help={timeError || ''}
            >
              {getFieldDecorator('startTime', timeConfig)(<TimePicker />)}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 }
              }}
            >
              <Button
                type="primary"
                disabled={hasErrors(getFieldsError())}
                htmlType="submit"
              >
                Check availability
              </Button>
              {/* <Button type="primary" disabled={hasErrors(getFieldsError())} htmlType="submit">Submit</Button> */}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedBookingModal = Form.create({ name: 'normal_register' })(
  BookingModal
);

function mapState(state) {
  console.log('user', state.user);
  return {
    allBookings: state.bookings,
    user: state.user
  };
}

// action need to get all bookings
const actionCreators = {
  addBooking: bookingActions.addBooking
};

const connectedBookingModal = connect(
  mapState,
  actionCreators
)(WrappedBookingModal);

export default connectedBookingModal;
