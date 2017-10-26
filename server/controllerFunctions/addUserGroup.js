// route to add user to a group
import firebase from 'firebase';

/**
 * controller function for adding user to group
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function addUserGroup(req, res) {
  // collect the group from url
  const groupId = req.params.groupId;

  // collect the user Id of the new user from the request body
  const newUserId = req.body.userId;
  const db = firebase.database();

  // check if this is a signed in user
  // add group to user's list of groups
  db.ref(`/users/${newUserId}/requests`).child(groupId).set(true);

  res.send({
    message: 'User sent request',
  });
}

