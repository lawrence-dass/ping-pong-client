// import { authHeader } from '../_helpers';
import { history } from '../_helpers';

export const userService = {
  login,
  logout,
  register
};

function register({ name, email, password }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  };
  console.log('requestOptions', requestOptions)
  return fetch(`http://localhost:8080/register`, requestOptions).then(handleResponse);
}


function login(name, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password })
  };

  return fetch(`http://localhost:8080/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem('user', JSON.stringify(user.token));
      return user.token;
    });
}

function logout() {
  localStorage.removeItem('user');
  history.push('/');
}

function handleResponse(response) {
  console.log('handleResponse t', response)
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log('data', data)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}