import React, { Component } from 'react';
import GoogleFa from 'react-icons/lib/fa/google-plus';
import googleSignInAction from '../../flux/actions/googleSignInAction';

/**
 * Google login button
 * @class GoogleLogin
 * @extends Component
 */
export default class GoogleLogin extends Component {
  /**
   * @memberof GoogLogin
   * @return {void}
   */
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* eslint class-methods-use-this: 0 */

  /**
   * @param {any} event 
   * @memberof GoogleLogin
   * @return {void}
   */
  handleSubmit(event) {
    event.preventDefault();
    googleSignInAction();
  }

  /**
   * renders google login button
   * @returns {void}
   */
  render() {
    return (
      <div className="google-signin">
        <button
          className = 'button'
          onClick = {this.handleSubmit}
          type = 'submit'>
          <GoogleFa />
        </button>
      </div>
    );
  }
}

