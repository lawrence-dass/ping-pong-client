import React, { Component } from 'react';
import { Layout, Button, Collapse, List } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

// internal imports
import '../styles/UserDashboard.scss';
import BookingModal from './BookingModal';
import { bookingActions } from '../_actions';

const { Footer } = Layout;
const { Panel } = Collapse;

class UserDashboard extends Component {
    state = {
        bookingModalVisible: false,
    };

    componentDidMount() {
        // get all bookings to check the avaiable time slots
        this.props.getAllBookings();
    }

    cancelBooking(bookingId) {
        this.props.cancelBooking(bookingId);
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
        const userId = localStorage.getItem('userId');
        console.log(this.props.allBookings.bookings)
        const currentBookings = this.props.allBookings.bookings.filter(booking => {
            return userId === `"${booking.id}"` && moment(`${booking.date} ${booking.endTime}`).isAfter(moment.now());
        })
        const pastBookings = this.props.allBookings.bookings.filter(booking => {
            return userId === `"${booking.id}"` && moment(`${booking.date} ${booking.endTime}`).isBefore(moment.now());
        })
        console.log(currentBookings, pastBookings);
        console.log('currentBookings.length', currentBookings.length)
        console.log('pastBookings.length', pastBookings.length)
        return (
            <div>
                <Layout>
                    <section className="dashboard">
                        <div className="dashboard__bookings">
                            <Button className="hero__ctaButton" type="primary" onClick={this.showBookingModal}> Make new booking</Button>
                            <Collapse className="accordion" defaultActiveKey={["1"]} accordion>
                                <Panel header="Current Bookings" key="1">
                                    <List>
                                        {currentBookings.length === 0 ?
                                            <p> No Bookings </p>
                                            : currentBookings.map((booking) => {
                                                console.log('jjk')
                                                return (<List.Item key={booking._id}>
                                                    <List.Item.Meta
                                                        title={`Date: ${booking.date}`}
                                                        description={`Slot: ${booking.startTime} - ${booking.endTime}, Duration: ${booking.duration} mins`}
                                                    />
                                                    <Button type="danger" onClick={() => this.cancelBooking(booking._id)}>Delete</Button>
                                                </List.Item >)
                                            })}
                                    </List>
                                </Panel>
                                <Panel header="History" key="2">
                                    <List>
                                        {pastBookings.length === 0 ?
                                            <p> No History </p>
                                            : pastBookings.map((booking) => {
                                                return (<List.Item key={booking._id}>
                                                    <List.Item.Meta
                                                        title={`Date: ${booking.date}`}
                                                        description={`Slot: ${booking.startTime} - ${booking.endTime}, Duration: ${booking.duration} mins`}
                                                    />
                                                </List.Item >)
                                            })}
                                    </List>
                                </Panel>
                            </Collapse>
                        </div>

                    </section>
                    <Footer className='dashboard__footer'> @Copyright Ping Pong LLC</Footer>
                    <BookingModal bookingModalVisible={this.state.bookingModalVisible} hideBookingModal={this.hideBookingModal}></BookingModal>
                </Layout>
            </div >
        )
    }
}

// map store bookings to component props
function mapState(state) {
    return {
        allBookings: state.bookings,
        user: state.user
    };
}

// action need to get all bookings
const actionCreators = {
    getAllBookings: bookingActions.getAllBookings,
    cancelBooking: bookingActions.cancelBooking
};

const connectedUserDashboard = connect(mapState, actionCreators)(UserDashboard);

export default connectedUserDashboard;