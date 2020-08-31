import { bookingConstants } from '../_constants';

export function bookings(state = { isEditing: false, loading: false, bookings: [] }, action) {
  switch (action.type) {
    case bookingConstants.GET_ALLBOOKINGS_REQUEST:
      return {
        loading: true,
        isEditing: false,
        bookings: []
      };
    case bookingConstants.GET_ALLBOOKINGS_SUCCESS:
      return {
        loading: false,
        isEditing: false,
        bookings: action.bookings
      };
    case bookingConstants.GET_ALLBOOKINGS_FAILURE:
      return {
        error: action.error
      };
    case bookingConstants.ADD_BOOKING_REQUEST:
      return {
        loading: true,
        isEditing: false,
        bookings: [...state.bookings]
      }
    case bookingConstants.ADD_BOOKING_SUCCESS:
      const { _id, date, startTime, id, endTime, duration, createdAt } = action.bookingDetails;
      const newBooking = { _id, id, date, startTime, endTime, duration, createdAt };
      const updatedBookingsAddingBooking = [...state.bookings, newBooking];
      return {
        loading: false,
        isEditing: false,
        bookings: [...updatedBookingsAddingBooking]
      }

    case bookingConstants.START_MODIFYING_BOOKING_REQUEST:
        return {
          loading: false,
          isEditing: true,
          bookings: [...state.bookings]
        }

    case bookingConstants.CANCEL_BOOKING_SUCCESS:
      const updatedBookingsAfterCancelling = state.bookings.filter((booking) => {
        return booking._id !== action.bookingId;
      })
      return {
        loading: false,
        isEditing: false,
        bookings: [...updatedBookingsAfterCancelling]
      }
    default:
      return state
  }
}