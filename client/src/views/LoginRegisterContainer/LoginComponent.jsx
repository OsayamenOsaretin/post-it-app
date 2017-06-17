import React from 'react';
import signInAction from '../../data/postItActions/userSignInAction';


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
 * @param {*} event
 */
  handleChange(event) {
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  }

  /**
   * @memberof LoginComponent
   * @returns {void}
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log('calls sign in action');
    signInAction(this.state);
  }

/**
 * @memberof LoginComponent
 * @returns {void}
 */
  render() {
    return (
      <form className = 'inputform'>
        <input
        id = 'formInput'
        name = 'email'
        placeholder = 'email'
        type ='text'
        autoComplete = 'off'
        value = {this.state.email}
        onChange = {this.handleChange} />

      <input
        id = 'formInput'
        name = 'password'
        placeholder = 'password'
        type ='text'
        autoComplete = 'off'
        value = {this.state.password}
        onChange = {this.handleChange} />

        <button
        className = 'button'
        onClick = {this.handleSubmit}
        type = 'submit'
        disabled = { !this.state.password || !this.state.email }>
        Log in
        </button>
      </form>
    );
  }
}

module.exports = LoginForm;
