// import seperate route modules

import signUpRoute from './user_signup_route';
import signInRoute from './user_signin_route';
import createGroup from './create_group_routes';
import addUser from './add_user_group_routes';
import signOut from './sign_out_route';
import getGroups from './get_groups_route';
import sendMessage from './send_message_route';
import getUsers from './get_all_users_route';

module.exports = (app, firebase) => {
  // These are the endpoints for the post-it api
  signUpRoute(app, firebase);
  signInRoute(app, firebase);
  createGroup(app, firebase);
  addUser(app, firebase);
  signOut(app, firebase);
  getGroups(app, firebase);
  sendMessage(app, firebase);
  getUsers(app, firebase);
};
