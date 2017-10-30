import React from 'react';
import LoginRegisterComponent from './LoginRegisterContainer.jsx';
import GoogleSignIn from './GoogleSignInComponent.jsx';
/**
 * LandingPageContainer holds the landing page including register and login
 * @returns {View} LandingPageView
 */
export default function LandingPageContainer() {
  return (
    <div className='landing-page-container'>
      <div className='landing-img-container'>
        <div className = "post-it-img">
        </div>
        <div className = "mail-box-img">
        </div>
      </div>
      <div className="login-register-container">
        <LoginRegisterComponent />
        <GoogleSignIn />
      </div>
    </div>
  );
}

