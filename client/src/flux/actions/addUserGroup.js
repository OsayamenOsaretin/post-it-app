import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';

/* global localStorage */


/**
 * addUserToGroups - sends a new message to a group
 * @param {*} Details
 * @return {void}
 */
export default (Details) => {
  const user = Details.userId;
  const groupId = Details.groupId;
  const token = localStorage.getItem('token');

  request
    .post(`/group/${groupId}/user`)
    .set('authorization', token)
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