import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/* global localStorage */

/**
 * recieveGroups dispatches to update registered stores with groups from API
 * @return {void}
 * @param {res} res
 */
export function recieveGroups(res) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
    userGroups: res
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
 * getGroups makes an api call for user's groups 
 * and dispatches(res) to registered listeners
 * @return {void}
 */
export function getGroups() {
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  request
    .get(`/groups/${userId}`)
    .set('authorization', token)
    .end((error) => {
      if (error) {
        // dispatch to handle the view case of failed group collection
        PostItDispatcher.handleViewAction({
          type: PostItActionTypes.FAILED_GROUPS,
          error: error.message
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.GETTING_GROUPS
        });
      }
    });
}

/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {*} groupName
 * @return {void}
 */
export function addGroupApi(groupName) {
  const token = localStorage.getItem('token');
  request
    .post('/group')
    .set('authorization', token)
    .send(groupName)
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_ADD_GROUP
        });
      } else {
        // make api call to get all the new groups
        const newGroup = result.body.group;
        recieveGroups(newGroup);
      }
    });
}
