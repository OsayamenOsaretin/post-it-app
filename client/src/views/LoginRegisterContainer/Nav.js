import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @function Nav
 * @memberof Nav.js
 * 
 * @returns {View} navlink component
 * Nav holds routes to login and register components
 */
export default () => (
  <ul className = 'auth-nav'>
    <li>
      <NavLink exact activeClassName='active' to='/login'>
          Log in
      </NavLink>
    </li>

    <li>
      <NavLink activeClassName='active' to='/register'>
          Register
      </NavLink>
    </li>
  </ul>);

