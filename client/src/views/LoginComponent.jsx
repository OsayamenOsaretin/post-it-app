import React from 'react';
import FormField from './FormInput.jsx';
import signInAction from '../data/postItActions/userSignInAction';


/**
 *
 */
class LoginForm extends React.Component {
  /**
  *
  *
  */
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
/**
 * @memberof LoginComponent
 * @returns {void}
 * @param {String} inputFieldState
 * @param {String} label
 */
  handleChange(inputFieldState, label) {
    if (label === 'password') {
      this.setState(() => ({
        password: inputFieldState
      }));
    } else {
      this.setState(() => ({
        email: inputFieldState
      })
    );
    }
  }

  /**
   * @memberof LoginComponent
   * @returns {void}
   */
  handleSubmit() {
    return signInAction(this.state);
  }

/**
 * @memberof LoginComponent
 * @returns {void}
 */
  render() {
    return (
      <form className = 'inputform' onSubmit = { this.handleSubmit }>
        <FormField
        label = "email"
        handleChange = { this.handleChange } />
        <FormField
        label = "password"
        handleChange = { this.handleChange } />

        <button
        className = 'button'
        type = 'submit'
        disabled = { !this.state.password || !this.state.email }>
        Log in
        </button>
      </form>
    );
  }
}

module.exports = LoginForm;
