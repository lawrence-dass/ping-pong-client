import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { bookings } from './booking.reducer';

const rootReducer = combineReducers({
  authentication,
  user,
  alert,
  bookings
});

export default rootReducer;
