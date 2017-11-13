import React from 'react';
import FaSignOut from 'react-icons/lib/fa/sign-out';

/**
 * @param {Object} props
 * 
 * @return {view} headerview
 */
export default props => (
  <div className="header">
    <div className="greeting">
      <h3>
          Hi, {props.username}
      </h3>
    </div>
    <div className="sign-out">
      <button
        title="Log out"
        className="sign-out-button"
        onClick={props.signOutHandler}
      >
        <FaSignOut
          size={30}
        />
      </button>
    </div>
  </div>
);
