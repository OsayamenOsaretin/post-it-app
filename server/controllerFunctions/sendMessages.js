// route to send message to group
import firebase from 'firebase';
import getUsersEmailsNumbers from '../utilities/get_users_emails_numbers';
import sendNotifications from '../utilities/send_notifications';

/**
 * controller function for sending messages
 * @return {void}
 * @param {*} req
 * @param {*} res
 */
export default function sendMessages(req, res) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const newMessage = req.body.message;
      const groupId = req.body.groupId;
      const messageSender = req.body.sender;
      const priorityLevel = req.body.priorityLevel;

      const db = firebase.database();

      // add new message to group messages and return new message key
      const newMessageKey = db.ref(`groups/${groupId}/messages/`)
        .push(true).key;

      // store message details in message node
      db.ref(`messages/${newMessageKey}`).set({
        message: newMessage,
        sender: messageSender,
        priority: priorityLevel
      });

      // immediately update the ui with the new message by sending the 
      // information back
      const newMessageResponse = new Map();
      newMessageResponse.set(newMessageKey, {
        message: newMessage,
        sender: messageSender,
        priority: priorityLevel
      });

      // send back response containing already sent new message
      res.send({
        message: 'Message Sent',
        newMessage: newMessageResponse,
        Id: groupId
      });

      // send email notifications
      getUsersEmailsNumbers(firebase, groupId,
        priorityLevel, sendNotifications);
    } else {
      res.status(403).send({
        // user is not signed in
        message: 'You are not signed in right now!'
      });
    }
  });
}
