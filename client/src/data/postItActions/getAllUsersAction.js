import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';


/**
 * getAllUsersAction - get all the PostIt registered users
 * @returns {void}
 * @param {*} groupId
 */
export default (groupId) => {
  request
  .post('/users')
  .send(groupId)
  .end((error, result) => {
    if (error) {
      console.log(error);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_GROUP_USERS
      });
    } else {
      console.log(result);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.GOT_GROUP_USERS
      });
    }
  });
};
