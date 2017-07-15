import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


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
 * getGroups makes an api call for user's groups and dispatches(res) to registered listeners
 * @return {void}
 */
export function getGroups() {
  console.log('action reaches here');
  request
  .get('/groups')
  .end((error, result) => {
    if (error) {
      // dispatch to handle the view case of failed group collection
      PostItDispatcher.handleViewAction({
        type: PostItActionTypes.FAILED_GROUPS,
        error: error.message
      });
    } else {
      console.log(result);
    }
  });
}

/**
 * addGroupApi makes an api call to add a group to user's group.
 * @param {*} groupName
 * @return {void}
 */
export function addGroupApi(groupName) {
  console.log('gets to group api action');
  request
  .post('/group')
  .send(groupName)
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      // make api call to get all the new groups
      console.log(result);
      getGroups();
      // PostItDispatcher.handleServerAction({
      //   type: PostItActionTypes.GET_GROUPS
      // });
    }
  });
}
