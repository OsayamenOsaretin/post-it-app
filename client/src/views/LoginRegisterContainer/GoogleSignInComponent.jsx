import React from 'react';
import googleSignInAction from '../../data/postItActions/googleSignInAction';

/* global gapi  window */

/**
 * Google login button
 */
class GoogleLogin extends React.Component {
  
  /**
   * @memberof GoogLogin
   * @return {void}
   */
  constructor() {
    super();

    this.onSignIn = this.onSignIn.bind(this);
    this.renderGoogleLoginButton = this.renderGoogleLoginButton.bind(this);
  }

  /**
   * callback for google sign in authentication
   * @return {void}
   * @param {*} googleUser
   */
  onSignIn(googleUser) {
    console.log('calls sign in method');
    const token = googleUser.getAuthResponse().id_token;
    googleSignInAction({
      idToken: token
    });
  }

  /**
   * renders google login button
   * @return {void}
   */
  renderGoogleLoginButton() {
    console.log('rendering google signin button');
    gapi.signin2.render('my-signin2', {
      scope: 'https://www.googleapis.com/auth/plus.login',
      width: 200,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn
    });
  }

  /**
   * hook for when component mounts
   * listen for google load event on window object
   * @return {void}
   */
  componentDidMount() {
    window.addEventListener('google-loaded', this.renderGoogleLoginButton);
  }

  /**
   * renders google login button
   * @returns {void}
   */
  render() {
    return (
      <div id="my-signin2">
      </div>
    );
  }
}

module.exports = GoogleLogin;
