import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch }
  from 'react-router-dom';
import LoginRegisterContainer from
  './LoginRegisterContainer/LandingPageContainer.jsx';
import Dashboard from './GroupContainer/Dashboard.jsx';
import ResetPasswordComponent from
  './LoginRegisterContainer/ResetPasswordView.jsx';
import UserStore from '../data/postItStores/PostItUserStore';
import { firebaseInit } from '../data/firebaseFunctions';

/**
 * App view that holds the entire container view for the app
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
      token: UserStore.getSignedInState(),
      passwordReset: true,
      messageSent: false,
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  /**
   * Attaches event listener to the UserStore
   * @return {void}
   * @memberof App
   */
  componentDidMount() {
    UserStore.addChangeListener(this.onChange);
  }

  /**
   * Removes event listener from the UserStore
   * @return {void}
   * @memberof App
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
      token: UserStore.getSignedInState(),
      messageSent: UserStore.getPasswordResetMessageState(),
      redirect: redirectStatus
    });
  }

  /**
   * handle click event
   * @return {void}
   * @param {*} event
   */
  handleClick(event) {
    event.preventDefault();
    this.setState({
      passwordReset: false
    });
  }

  /**
   * hanlde reset click event
   * @return {void}
   * @param {any} event 
   * @memberof App
   */
  handleResetClick() {
    this.setState({
      passwordReset: true
    });
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
              <Route exact path='/' component={() => {
                if (this.state.redirect) {
                  return <Redirect to='/login' />;
                }
                return (!this.state.token ?
                  (this.state.passwordReset &&
                    <LoginRegisterContainer />) : (<Dashboard />));
              }} />
              <Route path='/login' component={() => {
                if (!this.state.redirect) {
                  return <Redirect to='/' />;
                }
                return (this.state.passwordReset && <LoginRegisterContainer />);
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

