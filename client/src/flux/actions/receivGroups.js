import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
/**
 * recieveGroups dispatches to update registered stores with groups from API
 * 
 * @return {void}
 * 
 * @param {Map} response
 */
export default function recieveGroups(response) {
  PostItDispatcher.handleServerAction({
    type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
    userGroups: response
  });
}
