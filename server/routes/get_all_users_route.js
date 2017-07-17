import _ from 'lodash';

// route to get all the users
module.exports = (app, firebase) => {
  app.post('/users', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // group from request body
        const groupId = req.body.groupId;

        // user is signed in
        const db = firebase.database();

        // instantiate empty Map to hold users
        const users = new Map();

        // instantiate map to hold users not in a group
        const usersNotInGroup = new Map();

        // reference for the users already in the group
        const usersInGroupRef = db.ref(`/groups/${groupId}/users`);
        const usersInGroup = [];
        let usersNotInGroupKeys = [];

        // get all users
        const userReference = db.ref('/users/');
        const allUsers = [];

        userReference.once('value', (snapshot) => {
          snapshot.forEach((userSnapshot) => {
            users.set(userSnapshot.key, userSnapshot.val());
            allUsers.push(userSnapshot.key);
          });
          usersInGroupRef.once('value', (groupSnapshot) => {
            groupSnapshot.forEach((userInGroupSnapshot) => {
              usersInGroup.push(userInGroupSnapshot.key);
            });
            // find the users not in group using lodash
            usersNotInGroupKeys = _.difference(allUsers, usersInGroup);
            usersNotInGroupKeys.forEach((userNotInGroupKey) => {
              usersNotInGroup.set(userNotInGroupKey, users.get(userNotInGroupKey));
            });
            res.send({
              message: 'Users returned',
              userList: usersNotInGroup
            });
          });
        });
      } else {
        res.status(403).send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
