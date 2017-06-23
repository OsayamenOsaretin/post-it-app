import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';

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
    } else {
      console.log(result);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
        Id: groupId.groupId,
        messages: result.body.groupMessages
      });
    }
  });
};
