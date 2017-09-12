import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';
import { getDatabase, getAuth } from '../firebaseFunctions';


/**
 * addUserToGroups - sends a new message to a group
 * @param {*} Details
 * @return {void}
 */
export default ({ groupId, userId }) => {
  const database = getDatabase();
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      // add group to user's list of groups
      database.ref(`/users/${userId}/requests`).child(groupId).set(true);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.DELETE_USER,
        id: userId,
        groupId: groupId    // eslint-disable-line
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.LOGIN_ERROR
      });
    }
  });
};
