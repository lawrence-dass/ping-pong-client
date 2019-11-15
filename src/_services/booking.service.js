// import { authHeader } from '../_helpers';
// import { history } from '../_helpers';

export const bookingService = {
  getAllBookings,
  addBooking
};

function getAllBookings() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return fetch(`http://localhost:8080/getBookings`, requestOptions).then(handleResponse);
}

function addBooking({ id, date, startTime, endTime, duration, createdAt }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, date, startTime, endTime, duration, createdAt })
  };

  return fetch(`http://localhost:8080/book`, requestOptions).then(handleResponse);
}




function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data.result;
  });
}