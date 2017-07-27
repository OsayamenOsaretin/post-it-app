import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

/**
 * getMessagesAction - get all messages sent to a particular group
 * @returns {void}
 * @param {*} groupId
 */
export default (groupId) => {
  console.log('gets to get message action');
  request
    .post('/group/messages')
    .send(groupId)
    .end((error, result) => {
      if (error) {
        console.log(error);
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_GET_MESSAGES
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.SUCCEED_GET_MESSAGES
        });
        console.log(result);
      }
    });
};
