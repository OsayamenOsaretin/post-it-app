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

  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;

    const newGroupKey = database.ref('groups').push({
      groupname: groupName,
      creator: userId,
    }).key;

    database.ref(`/groups/${newGroupKey}/users/${userId}`).set({
      Id: userId,
    });

    // add group key to list of a user's group
    database.ref(`/users/${userId}/groups/`).child(newGroupKey).set(
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
}
