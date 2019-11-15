import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './_helpers';
import { alertActions } from './_actions';
import { PrivateRoute } from './_components';
import Dashboard from './components/UserDashboard';
import LandingPage from './components/LandingPage';
import './App.scss';
import 'antd/dist/antd.css';
import Header from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <Header />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/" component={LandingPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export default connectedApp;

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Switch>
//           <Route path="/login">
//             <Content />
//           </Route>
//           <PrivateRoute Component={UserDashboard} path="/dashboard">
//           </PrivateRoute>
//           <Route path="/">
//             <Content />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
// import './App.scss';
// import 'antd/dist/antd.css';

// // internal imports
// import Content from './components/Content';
// import UserDashboard from './components/UserDashboard';
// import Header from './components/Header'


// const fakeAuth = {
//   isAuthenticated: true,
//   // authenticate(cb) {
//   //   this.isAuthenticated = true;
//   //   setTimeout(cb, 100);
//   // },
//   // signout(cb) {
//   //   this.isAuthenticated = false;
//   //   setTimeout(cb, 100);
//   // }
// }


// const PrivateRoute = ({ Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/" />
//   )}>

//   </Route>
// )

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <Switch>
//           <Route path="/login">
//             <Content />
//           </Route>
//           <PrivateRoute Component={UserDashboard} path="/dashboard">
//           </PrivateRoute>
//           <Route path="/">
//             <Content />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// export default App;
