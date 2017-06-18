import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


/**
 * recieveGroups dispatches to update registered stores with groups from API
 * @return {void}
 * @param {res} res
 */
export function recieveGroups(res) {
  PostItDispatcher.handleServerAction({
    actionType: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
    response: res
  });
}
/**
 * add Group dispatches to add group to the user's list of groups
 * @return {void}
 * @param {*} name
 */
export function addGroup(name) {
  PostItDispatcher.handleServerAction({
    actionType: PostItActionTypes.ADD_GROUP,
    groupName: name,
  });
}
