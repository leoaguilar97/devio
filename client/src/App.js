
import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


//Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (<Provider store={store}>
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <section className="container">
          <Alert></Alert>
          <Switch>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
  );
}
export default App;
