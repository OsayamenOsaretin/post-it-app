import request from 'superagent';

/**
 * getMessagesAction - get all messages sent to a particular group
 * @returns {void}
 * @param {*} groupId
 * @param {*} socket
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
      }
    });
};
