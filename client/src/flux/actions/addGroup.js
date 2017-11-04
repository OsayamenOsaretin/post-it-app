import { getAuth, getDatabase } from '../firebaseHelpers';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';

/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {Object} theGroupName
 * 
 * @return {void}
 */
export default function addGroup({ groupName }) {
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const newUserId = user.uid;

      const newGroupKey = database.ref('groups').push({
        groupname: groupName,
        creator: newUserId,
      }).key;

      database.ref(`groups/${newGroupKey}/users/${newUserId}`).set({
        Id: newUserId,
      });

      // add group key to list of a user's group
      database.ref(`/users/${newUserId}/groups/`).child(newGroupKey).set(
        { id: newGroupKey }
      );
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.ADD_GROUP,
        groupName
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_ADD_GROUP
      });
    }
  });
}
