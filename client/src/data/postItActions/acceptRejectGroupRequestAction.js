import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';

export default (groupInviteDetails) => {
  request
    .post('/requests')
    .send(groupInviteDetails)
    .then((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        console.log('returns resolve request result');
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.DELETE_REQUEST,
          id: groupInviteDetails.groupId
        });
      }
    });
};
