import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';

/**
 * sendMessageAction - sends a new message to a group
 * @param {*} messageDetails
 * @return {void}
 */
export default (messageDetails) => {
  request
    .post('/message')
    .send(messageDetails)
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_SEND_MESSAGE
        });
      } else {
        const newMessage = result.body.newMessage;
        const groupId = result.body.Id;
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
          Id: groupId,
          messages: newMessage,
          notify: false
        });
      }
    });
};
