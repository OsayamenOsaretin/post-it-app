import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch }
  from 'react-router-dom';
import LoginRegisterContainer from
  './LoginRegisterContainer/LandingPageContainer.jsx';
import Dashboard from './GroupContainer/Dashboard.jsx';
import ResetPasswordComponent from
  './LoginRegisterContainer/ResetPasswordView.jsx';
import UserStore from '../stores/UserStore';
import { firebaseInit } from '../firebaseHelpers';
import signOutAction from '../actions/signOutAction';

/**
 * App view that holds the entire container view for the app
 * @class App
 * @extends Component
 */
export default class App extends Component {
  /**
   * instantiates an instance of the react component view
   * @memberof App
   */
  constructor() {
    super();
    firebaseInit();
    this.state = {
      token: this.authenticateUser(),
      passwordReset: true,
      messageSent: false,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  /**
   * Attaches event listener to the UserStore
   * @memberof App
   * @return {void}
   */
  componentDidMount() {
    this.authenticateUser();
    UserStore.addChangeListener(this.onChange);
  }

  /**
   * Removes event listener from the UserStore
   * @memberof App
   * @return {void}
   */
  componentWillUnmount() {
    UserStore.removeChangeListener(this.onChange);
  }

  /**
   * Change event call back to update state
   * @memberof App
   * @return {void}
   */
  onChange() {
    let redirectStatus = false;
    if (!UserStore.getSignedInState()) {
      redirectStatus = true;
    }
    this.setState({
      token: this.authenticateUser(),
      messageSent: UserStore.getPasswordResetMessageState(),
      redirect: redirectStatus
    });
  }

  /**
   * handle click event
   * @return {void}
   * 
   * @param {Object} event
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      passwordReset: false
    });
  }

  /**
   * hanlde reset click event
   * @param {Object} event 
   * 
   * @return {void}
   * 
   * @memberof App
   */
  handleResetClick() {
    this.setState({
      passwordReset: true
    });
  }

  /**
   * @returns {void}
   * @memberof App
   */
  authenticateUser() {
    const tokenState = UserStore.getSignedInState();
    if (tokenState === 'expired') {
      signOutAction();
      return undefined;
    }
    return tokenState;
  }

  /**
   * renders the component view
   * @return {void}
   */
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route path='/login' component={() => {
                if (!this.state.redirect) {
                  return <Redirect to='/' />;
                }
                return (this.state.passwordReset && <LoginRegisterContainer />);
              }} />
              <Route path='/' component={() => {
                if (this.state.redirect) {
                  return <Redirect to='/login' />;
                }
                return (!this.state.token ?
                  (this.state.passwordReset &&
                    <LoginRegisterContainer />) : (<Dashboard />));
              }} />
            </Switch>
          </div>
        </Router>
        {!this.state.token && this.state.passwordReset &&
          <div className="landing-page-container">
            <button
              className="forgot-password-button"
              onClick={this.handleClick}
              type="click">
              forgot password ?
            </button>
          </div>
        }
        {!this.state.passwordReset && <ResetPasswordComponent />}
        {!this.state.passwordReset && this.state.messageSent &&
        <p className="password-sent-message">
          A password reset email has been sent, refresh or proceed to <button
            className="login-button"
            onClick={this.handleResetClick}
            type="click">
            login
          </button>
        </p>}
      </div>
    );
  }
}

