import { getAuth, getDatabase } from '../firebaseHelpers';
import receiveGroups from './receivGroups';
import bulkMessageRequest from '../utility/bulkMessageRequest';
import getRequests from './getRequests';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/**
 * getGroups makes an api call for user's groups and dispatches(res)
 * to registered listeners
 * @return {void}
 */
export default function getGroups() {
  const auth = getAuth();
  const database = getDatabase();

  let groupKeys = [];

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;

      const groupsReference = database.ref(`/users/${userId}/groups/`);

      groupsReference.orderByKey().on('value', (snapshot) => {
        if (snapshot.val() === null) {
          PostItDispatcher.handleServerAction({
            type: PostItActionTypes.NO_GROUPS
          });
        }
        groupKeys = [];
        snapshot.forEach((groupSnapshot) => {
          groupKeys.push(groupSnapshot.key);
        });
        groupKeys.map((groupKey) => {
          const groupReference = database.ref(`/groups/${groupKey}`);
          groupReference.on('value', (snap) => {
            const group = new Map();
            group.set(groupKey, snap.val());
            receiveGroups(group);
            bulkMessageRequest(group);
          });
          return true;
        });
      });
      getRequests(userId, database);
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_LOGIN
      });
    }
  });
}
