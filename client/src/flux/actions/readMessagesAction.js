import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/**
 * readMessagesAction - marks messages as read by this user
 * @export
 * @function
 * @return {void}
 * @param {*} messages
 * @param {*} groupId
 */
export default (messages, groupId) => {
  request
    .post('/read')
    .send(messages)
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_READ_MESSAGE
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.READ_MESSAGE,
          Id: groupId
        });
      }
    });
};
