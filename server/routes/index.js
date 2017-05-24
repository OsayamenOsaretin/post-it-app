const signUpRoute = require('./user_signup_route');

module.exports = function (app, db) {
  // this signs up the user
  signUpRoute(app, db);
};
