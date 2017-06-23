import React from 'react';
import LoginRegisterComponent from './LoginRegisterContainer.jsx';

import postItImage from '../../resources/postIt.png';
import mailboxImage from '../../resources/mailbox.png';

/**
 * LandingPageContainer holds the landing page including register and login
 * @returns {void}
 */
function LandingPageContainer() {
  return (
    <div className='landing-page-container'>
      <div className='landing-img-container'>
    <div className = "post-it-img">
      <img src = {postItImage} />
    </div>
    <div className = "mail-box-img">
      <img src = {mailboxImage} />
    </div>
    </div>
    <div className = "login-register-container">
      <LoginRegisterComponent />
    </div>
    </div>
  );
}

module.exports = LandingPageContainer;
