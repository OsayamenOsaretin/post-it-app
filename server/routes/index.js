const signUpRoute = require('./user_signup_route');
const signInRoute = require('./user_signin_route');

module.exports = (app, firebase) => {
  // this signs up the user
  signUpRoute(app, firebase);
  signInRoute(app, firebase);
};
