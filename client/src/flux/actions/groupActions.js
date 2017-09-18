import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth, getDatabase } from '../firebaseFunctions';
import bulkMessageRequest from '../../utility/bulkMessageRequest';
import receiveRequests from '../../flux/actions/receiveRequestAction';


/**
 * recieveGroups dispatches to update registered stores with groups from API
 * @return {void}
 * @param {res} response
 */
export function recieveGroups(response) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
    userGroups: response
  });
}
/**
 * add Group dispatches to add group to the user's list of groups
 * @return {void}
 * @param {*} name
 */
export function addGroup(name) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.ADD_GROUP,
    groupName: name,
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

  // instantiate empty Map to hold groups
  const groups = new Map();

  // instantiate empty Map to hold requests
  const requests = new Map();

  let requestKeys = [];
  let groupKeys = [];

  auth.onAuthStateChanged((user) => {
    if (user) {
      const userId = user.uid;
      // get user's groups
      const groupsReference = database.ref(`/users/${userId}/groups/`);

      groupsReference.orderByKey().on('value', (snapshot) => {
        // clear groups map and keys to remove leaks between users
        groups.clear();
        groupKeys = [];
        // get the keys for each user's group
        snapshot.forEach((groupSnapshot) => {
          groupKeys.push(groupSnapshot.key);
        });

        // map to promises to asynchronously collect group info
        const promises = groupKeys.map(groupKey => (
          new Promise((resolve) => {
            const groupReference = database.ref(`/groups/${groupKey}`);
            groupReference.on('value', (snap) => {
              // add group info to list of groups
              groups.set(groupKey, snap.val());
              resolve();
            });
          })
        ));
        // collect resolved promises
        Promise.all(promises)
          .then(() => {
            recieveGroups(groups);
            bulkMessageRequest(groups);
          })
          .catch(() => {
          });
      });

      const requestReference = database.ref(`/users/${userId}/requests`);

      requestReference.orderByKey().on('value', (snapshot) => {
        // clear groups map and keys to remove leaks between users
        requests.clear();
        requestKeys = [];
        // get the keys for each user's group
        snapshot.forEach((requestSnapshot) => {
          requestKeys.push(requestSnapshot.key);
        });

        // map to promises to asynchronously collect group request info
        const promises = requestKeys.map(requestKey => (
          new Promise((resolve) => {
            const groupReference = database.ref(`/groups/${requestKey}`);
            groupReference.on('value', (snap) => {
              // add group info to list of groups
              requests.set(requestKey, snap.val());
              resolve();
            });
          })
        ));
        // collect resolved promises
        Promise.all(promises)
          .then(() => {
            receiveRequests(requests);
          })
          .catch(() => {
          });
      });
    }
  });
}

/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {*} theGroupName
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

      // return the new group to the client to update UI
      const newGroup = new Map();
      newGroup.set(newGroupKey, {
        groupname: groupName,
        creator: newUserId
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_ADD_GROUP
      });
    }
  });
}
