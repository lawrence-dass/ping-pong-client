import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import 'antd/dist/antd.css';

// internal imports
import Content from './components/Content';
import UserDashboard from './components/UserDashboard';
import Header from './components/Header'
import { AuthProvider } from './context/AuthContext'


const fakeAuth = {
  isAuthenticated: true,
  // authenticate(cb) {
  //   this.isAuthenticated = true;
  //   setTimeout(cb, 100);
  // },
  // signout(cb) {
  //   this.isAuthenticated = false;
  //   setTimeout(cb, 100);
  // }
}


const PrivateRoute = ({ Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
  )}>

  </Route>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <Switch>
            <Route path="/login">
              <Content />
            </Route>
            <PrivateRoute Component={UserDashboard} path="/dashboard">
            </PrivateRoute>
            <Route path="/">
              <Content />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
