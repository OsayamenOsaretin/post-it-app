import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

/**
 * readMessagesAction - marks messages as read by this user
 * @export
 * @function
 * @return {void}
 * @param {*} messages
 */
export default (messages, groupId) => {
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
      console.log(`read message: ${groupId}`);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.READ_MESSAGE,
        Id: groupId
      });
    }
  });
};
