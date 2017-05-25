const signUpRoute = require('./user_signup_route');
const signInRoute = require('./user_signin_route');
const createGroup = require('./create_group_routes');
const addUser = require('./add_user_group_routes.js');

module.exports = (app, firebase) => {
  // this signs up the user
  signUpRoute(app, firebase);
  signInRoute(app, firebase);
  createGroup(app, firebase);
  addUser(app, firebase);
};
