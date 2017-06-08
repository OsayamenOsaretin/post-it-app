import React from 'react';
import FormField from './FormInput.jsx';
import registerAction from '../data/postItActions/registerUserAction';

/**
 *
 */
export default class RegisterForm extends React.Component {
  /**
  *
  *
  */
  constructor() {
    super();

    this.state = {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

/**
 * @memberof RegisterComponent
 * @returns {void}
 * @param {String} inputFieldState
 * @param {String} label
 */
  handleChange(inputFieldState, label) {
    switch (label) {
    case 'userName': {
      this.setState(() => ({
        userName: inputFieldState
      }));
      break;
    }
    case 'email': {
      this.setState(() => ({
        email: inputFieldState
      }));
      break;
    }
    case 'password': {
      this.setState(() => ({
        password: inputFieldState
      }));
      break;
    }
    case 'confirmPassword': {
      this.setState(() => ({
        confirmPassword: inputFieldState
      }));
      break;
    }

    default: {
      break;
    }

    }
  }
/**
   * @memberof RegisterComponent
   * @returns {void}
   */
  handleSubmit() {
    if (this.password === this.confirmPassword) {
      registerAction({
        userName: this.userName,
        password: this.password,
        email: this.email
      });
    }
  }

/**
 * @memberof RegisterComponent
 * @returns {void}
 */
  render() {
    return (
       <form className = 'inputform' onSubmit = { this.handleSubmit }>
        <FormField
        label = 'userName'
        handleChange = {this.handleChange} />
        <FormField
        label = 'email'
        handleChange = { this.handleChange } />
        <FormField
        label='password'
        handleChange = { this.handleChange } />
        <FormField
        label='confirmPassword'
        handleChange = { this.handleChange} />

        <button
        className = 'button'
        type = 'submit'
        disabled = { !this.state.userName || !this.state.email ||
         !this.state.password || !this.state.confirmPassword }>
        Register
        </button>
      </form>
    );
  }
}

