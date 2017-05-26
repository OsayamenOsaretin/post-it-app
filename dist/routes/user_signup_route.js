'use strict';

// routes to user sign-up

module.exports = function (app, firebase) {
  app.post('/user/signup', function (req, res) {
    // perfom user signup here
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;

    // check that the user doesn't enter an empty field
    if (userName && email && password) {
      // create user with email and password
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
        // update the username of the user
        user.updateProfile({
          displayName: userName
        });
        res.send({ message: 'Welcome to the Post It. The fate of the Universe might depend on this' });
      }).catch(function () {
        res.send({ message: 'Error signing up :(' });
      });
    } else {
      // if email and password strings are empty
      res.send({
        message: 'Please make sure you enter all data'
      });
    }
  });
};