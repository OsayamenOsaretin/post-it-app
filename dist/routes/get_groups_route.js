'use strict';

module.exports = function (app, firebase) {
  app.get('/groups', function (req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        var userId = user.uid;
        var db = firebase.database();

        // instantiate empty Map to hold groups
        var groups = new Map();

        // get user's groups
        var groupsReference = db.ref('/users/' + userId + '/groups/');
        groupsReference.once('value', function (snapshot) {
          var groupKeys = [];

          // get the keys for each user's group
          snapshot.forEach(function (groupSnapshot) {
            groupKeys.push(groupSnapshot.key);
          });

          // map to promises to asynchronously collect group info
          var promises = groupKeys.map(function (groupKey) {
            return new Promise(function (resolve) {
              var groupReference = db.ref('groups/' + groupKey);
              groupReference.once('value', function (snap) {
                // add group info to list of groups
                groups.set(groupKey, snap.val());
                resolve();
              });
            });
          });
          // collect resolved promises
          Promise.all(promises).then(function () {
            res.send({
              message: 'Returned groups',
              userGroups: groups
            });
          }).catch(function (err) {
            res.status(401).send({
              message: 'Something went wrong ' + err.message
            });
          });
        });
      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};