'use strict';

// route to add user to a group

module.exports = function (app, firebase) {
  app.post('/group/:groupId/user', function (req, res) {
    // collect the group from url
    var groupId = req.params.groupId;

    // collect the user Id of the new user from the request body
    var newUserId = req.body.userId;
    var db = firebase.database();

    // check if this is a signed in user
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // get a reference to the groups users
        var groupRef = db.ref('/groups/' + groupId + '/users');

        // add new user to the group
        groupRef.child(newUserId).set({
          Id: newUserId
        });

        res.send({
          message: 'User added to group'
        });
      } else {
        res.send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};