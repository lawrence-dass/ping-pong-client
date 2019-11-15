import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { connect } from 'react-redux';

// internal imports
import '../styles/UserDashboard.scss';
import BookingModal from './BookingModal';
import { bookingActions } from '../_actions';

const { Footer } = Layout;

class UserDashboard extends Component {
    state = {
        bookingModalVisible: false,
    };

    componentDidMount() {
        // get all bookings to check the avaiable time slots
        this.props.getAllBookings();
    }

    showBookingModal = () => {
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
        const bookingsList = this.props.allBookings.bookings.map((booking) => {
            return <li key={booking.startTime}> Date: {booking.date}, Start Time: {booking.startTime} , End Time: {booking.endTime} Duration: {booking.duration} </li>
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

// map store bookings to component props
function mapState(state) {
    return { allBookings: state.bookings };
}

// action need to get all bookings
const actionCreators = {
    getAllBookings: bookingActions.getAllBookings,
};

const connectedUserDashboard = connect(mapState, actionCreators)(UserDashboard);

export default connectedUserDashboard;