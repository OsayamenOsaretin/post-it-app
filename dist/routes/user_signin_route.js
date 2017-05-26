'use strict';

// routes to user sign in

module.exports = function (app, firebase) {
  app.post('/user/signin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // check that email and password body are not empty
    if (email && password) {
      // sign in with user and email using firebase authentication
      firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        res.send({ message: 'Welcome User, or Ranger.' });
      }).catch(function () {
        res.send({ message: 'Error signing in :(' });
      });
    } else {
      // send error message in case of empty email and password
      res.send({ message: 'Please enter the right email and password' });
    }
  });
};