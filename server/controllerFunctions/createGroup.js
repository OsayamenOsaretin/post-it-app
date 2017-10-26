// route to create a group

// requires firebase and express instance
import firebase from 'firebase';

/**
 * controller function for creating groups
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function createGroup(req, res) {
  const groupName = req.body.groupName;
  // This means a user is signed in
  const userId = req.body.id;
  const db = firebase.database();

  // create a new group and return the unique key
  const newGroupKey = db.ref('groups').push({
    groupname: groupName,
    creator: userId,
  }).key;

  // add user id to list of group members
  db.ref(`groups/${newGroupKey}/users/${userId}`).set({
    Id: userId,
  });

  // add group key to list of a user's group
  db.ref(`/users/${userId}/groups/`).child(newGroupKey).set(
    { id: newGroupKey }
  );

  // return the new group to the client to update UI
  const newGroup = new Map();
  newGroup.set(newGroupKey, {
    groupname: groupName,
    creator: userId
  });

  res.send({
    message: 'Created Group',
    group: newGroup
  });
}
