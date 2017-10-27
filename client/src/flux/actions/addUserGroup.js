import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';

/**
 * addUserToGroups - sends a new message to a group
 * @param {*} Details
 * @return {void}
 */
export default (Details) => {
  const user = Details.userId;
  const groupId = Details.groupId;

  request
    .post(`/group/${groupId}/user`)
    .send({
      userId: user
    })
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_ADD_USER
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.DELETE_USER,
          id: user,
          groupId: Details.groupId
        });
      }
    });
};