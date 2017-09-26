import React from 'react';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import signOutAction from '../flux/actions/signOutAction';

/* global localStorage */

/**
 * calls sign out action
 * @returns {void}
 * @param {Object} event
 */
const signOutHandler = (event) => {
  event.preventDefault();
  signOutAction();
};

export default () => {
  const userName = localStorage.getItem('username');
  return (
    <div className="header">
      <div className="greeting">
        <h3>
          Hi, {userName}
        </h3>
      </div>
      <div className="sign-out">
        <button
          title="Log out"
          className="sign-out-button"
          onClick={signOutHandler}
        >
          <FaSignOut
            size={30}
          />
        </button>
      </div>
    </div>
  );
};
