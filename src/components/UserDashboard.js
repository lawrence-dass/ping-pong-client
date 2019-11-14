import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import axios from 'axios';

// internal imports
import './userDashboard.scss';
import BookingModal from './BookingModal';
const { Footer } = Layout;




export default class UserDashboard extends Component {
    state = {
        bookingModalVisible: false,
        allBookings: []
    };

    componentDidMount() {
        axios.get('http://localhost:8080/getBookings')
            .then(res => {
                console.log('res', res);
                this.setState(() => {
                    return { allBookings: res.data.result }
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

    showBookingModal = () => {
        console.log('showBookingModal t')
        this.setState({
            bookingModalVisible: true,
        });
    };

    hideBookingModal = (value) => {
        this.setState({
            bookingModalVisible: value,
        });

    };



    render() {
        console.log(this.state);
        const bookingsList = this.state.allBookings.map((booking) => {
            console.log(booking);
            return <li key={booking.startTime}> Date: {booking.date}, Start Time: {booking.stateTime} , End Time: {booking.endTime} Duration: {booking.duration} </li>
        });
        return (
            <div>
                <Layout>
                    <section className="dashboard">
                        <div className="dashboard__bookings">
                            <h1> You current booking: </h1>
                            <ul>
                                {bookingsList}
                            </ul>
                        </div>
                        <Button className="hero__ctaButton" type="primary" onClick={this.showBookingModal}> Make new booking!</Button>
                    </section>
                    <Footer className='footer'> @Copyright Ping Pong LLC</Footer>
                    <BookingModal bookingModalVisible={this.state.bookingModalVisible} hideBookingModal={this.hideBookingModal}></BookingModal>
                </Layout>
            </div>
        )
    }
}
