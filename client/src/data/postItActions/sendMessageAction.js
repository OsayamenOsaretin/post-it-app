import request from 'superagent';
import getMessageAction from './getMessagesAction';

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
    } else {
      getMessageAction({
        groupId: messageDetails.groupId
      });
      console.log(result);
    }
  });
};
