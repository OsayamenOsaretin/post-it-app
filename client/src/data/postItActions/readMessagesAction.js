import request from 'superagent';

/**
 * readMessagesAction - marks messages as read by this user
 * @export
 * @function
 * @return {void}
 * @param {*} messages
 */
export default (messages) => {
  console.log(
    'calls action to mark messages read'
  );
  request
  .post('/read')
  .send(messages)
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
};
