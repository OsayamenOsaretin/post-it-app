import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth, getDatabase } from '../firebaseHelpers';
import receiveRequests from '../../flux/actions/receiveRequestAction';
import bulkMessageRequest from '../../utility/bulkMessageRequest';

/**
 * recieveGroups dispatches to update registered stores with groups from API
 * 
 * @return {void}
 * 
 * @param {Map} response
 */
export function recieveGroups(response) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
    userGroups: response
  });
}
/**
 * add Group dispatches to add group to the user's list of groups
 * @param {String} name
 * 
 * @return {void}
 */
export function addGroup(name) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.ADD_GROUP,
    groupName: name,
  });
}

/** 
 * @param {String} userId 
 * @param {Object} database
 * 
 * @return {void}
 */
function getRequests(userId, database) {
  const requestReference = database.ref(`/users/${userId}/requests`);

  requestReference.orderByKey().on('value', (snapshot) => {
    const requestKeys = [];

    // get the keys for each user's group
    snapshot.forEach((requestSnapshot) => {
      requestKeys.push(requestSnapshot.key);
    });

    requestKeys.map((requestKey) => {
      const groupReference = database.ref(`/groups/${requestKey}`);
      groupReference.on('value', (snap) => {
        const request = new Map();
        request.set(requestKey, snap.val());
        receiveRequests(request);
      });
      return true;
    });
  });
}

/**
 * getGroups makes an api call for user's groups and dispatches(res)
 * to registered listeners
 * @return {void}
 */
export function getGroups() {
  const auth = getAuth();
  const database = getDatabase();

  let groupKeys = [];

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;

      const groupsReference = database.ref(`/users/${userId}/groups/`);

      groupsReference.orderByKey().on('value', (snapshot) => {
        groupKeys = [];
        snapshot.forEach((groupSnapshot) => {
          groupKeys.push(groupSnapshot.key);
        });
        groupKeys.map((groupKey) => {
          const groupReference = database.ref(`/groups/${groupKey}`);
          groupReference.on('value', (snap) => {
            const group = new Map();
            group.set(groupKey, snap.val());
            recieveGroups(group);
            bulkMessageRequest(group);
          });
          return true;
        });
      });

      getRequests(userId, database);
    }
  });
}

/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {Object} theGroupName
 * 
 * @return {void}
 */
export function addGroupApi({ groupName }) {
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
