import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getAuth, getDatabase } from '../firebaseFunctions';

/**
 * messagesAction - marks messages as read by this user
 * @export
 * @function
 * @return {void}
 * @param {*} messages
 * @param {*} groupId
 */
export default ({ messages }, groupId) => {
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const messageRef = database.ref('messages');
      const userName = user.displayName;

      if (messages) {
        messages.forEach(({ sender }, messageId) => {
          if (userName !== sender) {
            messageRef.child(`${messageId}/read/${userName}`).set(true);
          }
        });
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.READ_MESSAGE,
          Id: groupId
        });
      }
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_READ_MESSAGE
      });
    }
  });
};
