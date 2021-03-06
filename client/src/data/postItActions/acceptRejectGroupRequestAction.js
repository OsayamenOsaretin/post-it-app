import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';
import { getAuth, getDatabase } from '../firebaseFunctions';

export default ({ groupId, status }) => {
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      if (status === 'true') {
        // if user accepted the group request
        const groupRef = database.ref(`/groups/${groupId}/users/${userId}`);

        // add user to the group
        groupRef.set({
          Id: userId
        });

        // add group to user's list of groups
        database.ref(`/users/${userId}/groups/${groupId}`).set(true);
      }
      // remove request
      database.ref(`/users/${userId}/requests/${groupId}`).remove();
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.DELETE_REQUEST,
        id: groupId
      });
    }
  });
};
