import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
// import getMessageAction from './getMessagesAction';

/**
 * sendMessageAction - sends a new message to a group
 * @param {*} messageDetails
 * @return {void}
 */
export default (messageDetails) => {
  console.log('reaches send message action');
  request
  .post('/message')
  .send(messageDetails)
  .end((error, result) => {
    if (error) {
      console.log(error);
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
      console.log(result);
    }
  });
};
