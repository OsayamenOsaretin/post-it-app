import axios from 'axios';
import PostItActionTypes from '../data/PostItActionTypes';
import PostItDispatcher from '../data/PostItDispatcher';
import { recieveGroups } from '../data/postItActions/postItServerActions';

/**
 * getGroups makes an api call for user's groups and dispatches(res) to registered listeners
 * @return {void}
 */
export function getGroups() {
  axios.get('/groups')
  .then((res) => {
    // call server action to handle recieved groups info
    if (res.status === 200) {
      recieveGroups(res);
    } else {
      PostItDispatcher.handleServerAction({
        actionType: PostItActionTypes.FAILED_GROUPS,
        error: res.message
      });
    }
  })
  .catch((err) => {
    PostItDispatcher.handleViewAction({
      actionType: PostItActionTypes.FAILED_GROUPS,
      error: err.message
    });
  });
}
/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {*} groupName
 * @return {void}
 */
export function addGroupApi(groupName) {
  axios.post('/group', {
    body: groupName,
  })
  .then((res) => {
    if (res.status === 200) {
      // make api call to get all the new groups
      getGroups();
    }
  });
}
