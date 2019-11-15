import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { bookings } from './booking.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  bookings
});

export default rootReducer;