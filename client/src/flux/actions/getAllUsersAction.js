import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';


/**
 * getAllUsersAction - get all the PostIt registered users
 * @returns {void}
 * @param {*} groupId
 */
export default (groupId) => {
  request
    .post('/users')
    .send(groupId)
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_GROUP_USERS
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.GOT_GROUP_USERS
        });
      }
    });
};
