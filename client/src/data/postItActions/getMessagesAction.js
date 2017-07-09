import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';

/**
 * getMessagesAction - get all messages sent to a particular group
 * @returns {void}
 * @param {*} groupId
 */
export default (groupId, socket) => {
  console.log('gets to get message action');
  request
  .post('/group/messages')
  .send(groupId)
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      socket.on('newMessage', (newMessages) => {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
          Id: newMessages.Id,
          messages: newMessages.groupMessages
        });
      });
    }
  });
};
