import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';

export default (groupInviteDetails) => {
  request
    .post('/requests')
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
