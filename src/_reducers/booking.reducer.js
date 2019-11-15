import { bookingConstants } from '../_constants';

export function bookings(state = { loading: false, bookings: [] }, action) {
  switch (action.type) {
    case bookingConstants.GET_ALLBOOKINGS_REQUEST:
      return {
        loading: true,
        bookings: []
      };
    case bookingConstants.GET_ALLBOOKINGS_SUCCESS:
      return {
        loading: false,
        bookings: action.bookings
      };
    case bookingConstants.GET_ALLBOOKINGS_FAILURE:
      return {
        error: action.error
      };
    case bookingConstants.ADD_BOOKING_REQUEST:
      return {
        loading: true,
        bookings: [...state.bookings]
      }
    case bookingConstants.ADD_BOOKING_SUCCESS:
      const { id, date, startTime, endTime, duration, createdAt } = action.bookingDetails;
      const newBooking = { id, date, startTime, endTime, duration, createdAt };
      const updatedBookings = [...state.bookings, newBooking];
      return {
        loading: false,
        bookings: [...updatedBookings]
      }
    default:
      return state
  }
}