import React, { Component } from 'react';
import resetPasswordAction from '../../flux/actions/resetPasswordAction';
import UserStore from '../../flux/stores/UserStore';

/**
 * ResetPasswordForm is component for resetting password
 */
export default class ResetPasswordForm extends Component {
  /**
   * constructor for resetPasswordForm
   * @return {void}
   */
  constructor() {
    super();

    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @param {Object} event
   * 
   * @return {void}
   */
  handleChange(event) {
    const value = event.target.value;

    this.setState({
      email: value
    });
  }

  /**
   * @param {Object} event
   * 
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    resetPasswordAction({
      email: this.state.email
    });
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
   * @return {void}
   */
  onChange() {
    this.setState({
      email: ''
    });
  }

  /**
   * render reset password form component
   * @returns {void}
   */
  render() {
    return (
      <div className="reset-form">
        <p> Request password reset</p>
        <form className = 'inputform'>
          <input
            id='formInput'
            name='email'
            placeholder='Please enter your registered email'
            type='text'
            autoComplete='off'
            value={this.state.email}
            onChange={this.handleChange} />

          <button
            className='button'
            onClick={this.handleSubmit}
            type='submit'
            disabled={!this.state.email}>
            Reset Password
          </button>
        </form>
      </div>
    );
  }
}

