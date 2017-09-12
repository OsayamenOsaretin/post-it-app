import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getDatabase, getAuth } from '../firebaseFunctions';
import sendNotifications from '../../utility/send_notifications';
import getUsersEmailsNumbers from '../../utility/get_users_emails_numbers';

/* eslint object-shorthand: 0 */

/**
 * sendMessageAction - sends a new message to a group
 * @param {*} messageDetails
 * @return {void}
 */
export default ({ message, sender, groupId, priorityLevel }) => {
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged((user) => {
    if (user) {
      const newMessageKey = database.ref(`groups/${groupId}/messages/`)
        .push(true).key;

      database.ref(`messages/${newMessageKey}`).set({
        message: message,
        sender: sender,
        priority: priorityLevel
      }).then(() => {
        const newMessageResponse = new Map();
        newMessageResponse.set(newMessageKey, {
          message: message,
          sender: sender,
          priority: priorityLevel
        });
        getUsersEmailsNumbers({
          database() {
            return database;
          }
        }, groupId,
        priorityLevel, sendNotifications);
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_SEND_MESSAGE
      });
    }
  });
};
