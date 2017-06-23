'use strict';

// route leads to a sign out

module.exports = function (app, firebase) {
  app.get('/signout', function (req, res) {
    firebase.auth().signOut().then(function () {
      res.send({
        message: 'You are successfully signed out'
      });
    }).catch(function (error) {
      res.status(405).send({
        message: 'Sorry, ' + error.message + '. please try to sign out again'
      });
    });
  });
};