import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth, getDatabase } from '../firebaseHelpers';

/**
 * messagesAction - marks messages as read by this user
 * 
 * @param {Map} messages
 * @param {String} groupId
 * 
 * @return {void}
 *
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
