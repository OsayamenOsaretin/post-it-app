import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';
import { getDatabase, getAuth } from '../firebaseHelpers';


/**
 * addUserToGroups - sends request to user invited to group 
 * 
 * @param {Object} Details the user and group details
 * 
 * @return {void}
 */
export default ({ groupId, userId }) => {
  const database = getDatabase();
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      database.ref(`/users/${userId}/requests`).child(groupId).set(true);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.DELETE_USER,
        id: userId,
        groupId
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_ADD_USER
      });
    }
  });
};
