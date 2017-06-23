'use strict';

// route to get all the users
module.exports = function (app, firebase) {
  app.get('/users', function (req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        var db = firebase.database();

        // instantiate empty Map to hold users
        var users = new Map();

        var userReference = db.ref('/users/');
        userReference.once('value', function (snapshot) {
          snapshot.forEach(function (userSnapshot) {
            users.set(userSnapshot.key, userSnapshot.val());
          });

          res.send({
            message: 'Users returned',
            userList: users
          });
        });
      } else {
        res.status(403).send({
          message: 'You are not signed in right now! '
        });
      }
    });
  });
};