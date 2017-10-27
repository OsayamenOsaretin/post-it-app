import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/**
 * getMessagesAction - get all messages sent to a particular group
 * @returns {void}
 * @param {*} groupId
 */
export default (groupId) => {
  request
    .post('/group/messages')
    .send(groupId)
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_GET_MESSAGES
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.SUCCEED_GET_MESSAGES
        });
      }
    });
};