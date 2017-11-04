import React from 'react';
import LoginRegisterComponent from './LoginRegisterContainer.jsx';
import GoogleSignIn from './GoogleSignInComponent.jsx';
/**
 * LandingPageContainer holds the landing page including register and login
 * @returns {View} LandingPageView
 */
export default function LandingPageContainer() {
  return (
    <div className="container landing-page-container">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="col-sm-6 col-md-12">
            <div className="post-it-img">
            </div>
          </div>
          <div className="col-sm-6 col-md-12">
            <div className="mail-box-img">
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-8">
          <LoginRegisterComponent />
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}

