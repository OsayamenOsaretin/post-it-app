import _ from 'lodash';

// route to get all the users
module.exports = (app, firebase, io) => {
  console.log('we are here');
  app.post('/users', (req, res) => {
    console.log('we get here');
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

        userReference.on('value', (snapshot) => {
          snapshot.forEach((userSnapshot) => {
            users.set(userSnapshot.key, userSnapshot.val());
            allUsers.push(userSnapshot.key);
          });
          usersInGroupRef.on('value', (groupSnapshot) => {
            groupSnapshot.forEach((userInGroupSnapshot) => {
              usersInGroup.push(userInGroupSnapshot.key);
            });
            // find the users not in group using lodash
            usersNotInGroupKeys = _.difference(allUsers, usersInGroup);
            usersNotInGroupKeys.forEach((userNotInGroupKey) => {
              usersNotInGroup.set(userNotInGroupKey, users.get(userNotInGroupKey));
            });
            io.emit('Users', {
              userList: usersNotInGroup,
              Id: groupId
            });
          });
        });
        res.send({
          message: 'Users returned'
        });
      } else {
        res.status(403).send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
