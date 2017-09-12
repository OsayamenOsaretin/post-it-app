import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';
import { getAuth, getDatabase } from '../firebaseFunctions';

/**
 * getMessagesAction - get all messages sent to a particular group
 * @returns {void}
 * @param {*} theGroupId
 */
export default ({ groupId }) => {
  const auth = getAuth();
  const database = getDatabase();

  auth.onAuthStateChanged((user) => {
    if (user) {
      // user is signed in
      const newMessages = new Map();
      const userName = user.displayName;

      const messagesReference = database.ref(`/groups/${groupId}/messages`);

      // store message keys
      const messageKeys = [];

      // keep an array of promises
      const promises = [];

      // notification value will be set if notification should happen
      let notificationValue;

      // get message Id from groups and iterate through messages node
      messagesReference.orderByKey().on('child_added', (snapshot) => {
        promises.push(new Promise((resolve) => {
          messageKeys.push(snapshot.key);
          const messageReference = database.ref(`/messages/${snapshot.key}`);
          messageReference.orderByKey().on('value', (snap) => {
            notificationValue = false;
            const newMessage = snap.val();
            newMessages.set(snap.key, snap.val());
            if (newMessage.read) {
              if (!newMessage.read[userName]) {
                if (newMessage.sender !== userName) {
                  notificationValue = true;
                }
              }
            } else if (newMessage.sender !== userName) {
              notificationValue = true;
            }
            resolve();
          });
        }));
        Promise.all(promises)
          .then(() => {
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
