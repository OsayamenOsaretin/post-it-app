import _ from 'lodash';
import firebase from 'firebase';

// route to get all the users


/**
 * controller function to get users not in group
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function getUsersNotInGroup(req, res) {
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
}
