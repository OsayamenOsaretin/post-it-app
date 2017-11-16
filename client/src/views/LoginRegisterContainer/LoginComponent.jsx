import React, { Component } from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import signInAction from '../../actions/userSignInAction';
import ErrorStore from '../../stores/ErrorStore';


/**
 * LoginForm 
 * @class LoginForm
 * @extends {Component}
 */
export default class LoginForm extends Component {
  /**
  * constructor for login form component
  * @memberof LoginForm
  */
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
      login: false,
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @memberof LoginComponent
   * @returns {void}
   * 
   * @param {Object} event
   */
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  /**
   * @memberof LoginComponent
   * 
   * @returns {void}
   * 
   * @param {Object} event
   */
  handleSubmit(event) {
    event.preventDefault();

    signInAction({
      email: this.state.email,
      password: this.state.password
    });

    this.setState({
      login: true,
      errorMessage: ''
    });
  }

  /**
   * onChange method callback for error store
   * @return {void}
   */
  onChange() {
    const loginError = ErrorStore.getLoginError();
    if (loginError) {
      this.setState({
        errorMessage: loginError,
        password: '',
        login: false
      });
    }
  }

  /**
   * add change listener from ErrorStore
   * @memberof LoginComponent
   * 
   * @return {void}
   */
  componentDidMount() {
    ErrorStore.addChangeListener(this.onChange);
  }

  /**
   * removes change listener from ErrorStore
   * @memberof LoginComponent
   * 
   * @return {void}
   */
  componentWillUnmount() {
    ErrorStore.removeChangeListener(this.onChange);
  }

  /**
   * @memberof LoginComponent
   * 
   * @returns {void}
   */
  render() {
    return (
      <form className = 'inputform'>
        <input
          id = 'formInput'
          name = 'email'
          placeholder = 'email'
          type ='email'
          autoComplete = 'off'
          value = {this.state.email}
          onChange = {this.handleChange} />

        <input
          id = 'formInput'
          name = 'password'
          placeholder = 'password'
          type ='password'
          autoComplete = 'off'
          value = {this.state.password}
          onChange = {this.handleChange} />

        <button
          className = 'button'
          onClick = {this.handleSubmit}
          type = 'submit'
          disabled = { !this.state.password || !this.state.email }>
          Log in {this.state.login &&
          <FaSpinner className="fa fa-spinner fa-spin"/>}
        </button>

        {this.state.errorMessage &&
          <div className="error-login-register">
            <FaExclamationTriangle /> {this.state.errorMessage}
          </div>
        }
      </form>
    );
  }
}

