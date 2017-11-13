import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';
import { getAuth, getDatabase } from '../firebaseHelpers';

/* global localStorage */


/**
 * getMessagesAction - get all messages sent to a particular group
 * 
 * @returns {void}
 * 
 * @param {Object} groupId
 */
export default ({ groupId }) => {
  const auth = getAuth();
  const database = getDatabase();
  const username = localStorage.getItem('username');

  auth.onAuthStateChanged((user) => {
    if (user) {
      // user is signed in
      const newMessages = new Map();

      const messagesReference = database.ref(`/groups/${groupId}/messages`);

      // get message Id from groups and iterate through messages node
      messagesReference.orderByKey().on('child_added', (snapshot) => {
        const messageReference = database.ref(`/messages/${snapshot.key}`);
        messageReference.orderByKey().on('value', (snap) => {
          // notification value will be set if notification should happen
          let notificationValue = false;
          const newMessage = snap.val();
          newMessages.set(snap.key, newMessage);
          notificationValue = (newMessage.read &&
            !newMessage.read[username] && newMessage.sender !== username) ||
            (!newMessage.read && newMessage.sender !== username);
          PostItDispatcher.handleServerAction({
            type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
            Id: groupId,
            messages: newMessages,
            notify: notificationValue
          });
        });
      });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_GET_MESSAGES
      });
    }
  });
};
