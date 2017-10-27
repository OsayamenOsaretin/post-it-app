import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';

/* global localStorage */

export default (groupInviteDetails) => {
  const token = localStorage.getItem('token');
  request
    .post('/requests')
    .set('authorization', token)
    .send(groupInviteDetails)
    .then((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_ADD_GROUP,
          error
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.DELETE_REQUEST,
          id: groupInviteDetails.groupId
        });
      }
    });
};
