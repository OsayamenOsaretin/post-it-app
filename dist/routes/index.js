'use strict';

var _user_signup_route = require('./user_signup_route');

var _user_signup_route2 = _interopRequireDefault(_user_signup_route);

var _user_signin_route = require('./user_signin_route');

var _user_signin_route2 = _interopRequireDefault(_user_signin_route);

var _create_group_routes = require('./create_group_routes');

var _create_group_routes2 = _interopRequireDefault(_create_group_routes);

var _add_user_group_routes = require('./add_user_group_routes');

var _add_user_group_routes2 = _interopRequireDefault(_add_user_group_routes);

var _sign_out_route = require('./sign_out_route');

var _sign_out_route2 = _interopRequireDefault(_sign_out_route);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, firebase) {
  // These are the endpoints for the post-it api
  (0, _user_signup_route2.default)(app, firebase);
  (0, _user_signin_route2.default)(app, firebase);
  (0, _create_group_routes2.default)(app, firebase);
  (0, _add_user_group_routes2.default)(app, firebase);
  (0, _sign_out_route2.default)(app, firebase);
}; // import seperate route modules