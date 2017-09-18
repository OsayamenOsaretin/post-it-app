import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import LoginForm from './LoginComponent.jsx';
import RegisterForm from './RegisterComponent.jsx';
import Nav from './Nav';


/**
 * LoginRegisterContainer holds the login and register components
 * @returns {void}
 */
export default function LoginRegisterContainer() {
  return (
    <BrowserRouter>
      <div className = 'loginRegisterContainer' >
        <Nav />
        <Switch>
          <Route exact path = '/' component = {LoginForm} />
          <Route exact path = '/login' component = {LoginForm} />
          <Route exact path = '/register' component = {RegisterForm} />
          <Route render = { () => (
            <p> Not found </p>
          )} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

