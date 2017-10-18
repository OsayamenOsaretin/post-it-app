import lodash from 'lodash';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';
import { getAuth, getDatabase } from '../firebaseFunctions';


/**
 * getAllUsersAction - get all the PostIt registered users
 * 
 * @returns {void}
 * 
 * @param {Object} groupId 
 */
export default ({ groupId }) => {
  const auth = getAuth();
  const database = getDatabase();
  auth.onAuthStateChanged((user) => {
    if (user) {
      // instantiate empty Map to hold users
      const users = new Map();

      // instantiate map to hold users not in a group
      const usersNotInGroup = new Map();

      // reference for the users already in the group
      const usersInGroupRef = database.ref(`/groups/${groupId}/users`);

      // get all users
      const userReference = database.ref('/users/');

      userReference.once('value', (snapshot) => {
        const allUsers = [];
        snapshot.forEach((userSnapshot) => {
          users.set(userSnapshot.key, userSnapshot.val());
          allUsers.push(userSnapshot.key);
        });
        usersInGroupRef.once('value', (groupSnapshot) => {
          const usersInGroup = [];
          let usersNotInGroupKeys = [];
          groupSnapshot.forEach((userInGroupSnapshot) => {
            usersInGroup.push(userInGroupSnapshot.key);
          });
          // find the users not in group using lodash
          usersNotInGroupKeys = lodash.difference(allUsers, usersInGroup);
          usersNotInGroupKeys.forEach((userNotInGroupKey) => {
            usersNotInGroup
              .set(userNotInGroupKey, users.get(userNotInGroupKey));
          });
          PostItDispatcher.handleServerAction({
            type: PostItActionTypes.RECIEVE_USERS,
            users: usersNotInGroup,
            id: groupId
          });
        });
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_GROUP_USERS
      });
    }
  });
};
