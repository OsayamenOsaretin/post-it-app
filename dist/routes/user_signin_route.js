'use strict';

var _validate_email = require('../utilities/validate_email');

var _validate_email2 = _interopRequireDefault(_validate_email);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app, firebase) {
  app.post('/user/signin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!(0, _validate_email2.default)(email)) {
      res.status(400).send({
        message: 'Please use a valid email address'
      });
    } else if (password) {
      // sign in with user and email using firebase authentication
      var db = firebase.database();
      var promise = firebase.auth().signInWithEmailAndPassword(email, password);

      promise.then(function (user) {
        console.log('signs in user');
        res.status(200).send({
          message: 'Welcome User, or Ranger.',
          userData: user
        });
      }).catch(function (error) {
        var errorMessage = error.message;
        res.status(401).send({ message: 'Error signing in :( : ' + errorMessage });
      });
    } else {
      // send error message in case of empty email and password
      res.status(400).send({ message: 'Please fill in your password' });
    }
  });
}; // routes to user sign in