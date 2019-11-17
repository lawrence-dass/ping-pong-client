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
      const { _id, date, startTime, endTime, duration, createdAt } = action.bookingDetails;
      const newBooking = { _id, date, startTime, endTime, duration, createdAt };
      const updatedBookingsAddingBooking = [...state.bookings, newBooking];
      return {
        loading: false,
        bookings: [...updatedBookingsAddingBooking]
      }
    case bookingConstants.CANCEL_BOOKING_SUCCESS:
      const updatedBookingsAfterCancelling = state.bookings.filter((booking) => {
        return booking._id !== action.bookingId;
      })
      return {
        loading: false,
        bookings: [...updatedBookingsAfterCancelling]
      }
    default:
      return state
  }
}