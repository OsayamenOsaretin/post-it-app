// route to send message to group
import getUsersEmailsNumbers from '../utilities/get_users_emails_numbers';
import sendNotifications from '../utilities/send_notifications';

module.exports = (app, firebase) => {
  app.post('/message', (req, res) => {
    const newMessage = req.body.message;
    const groupId = req.body.groupId;
    const messageSender = req.body.sender;
    const priorityLevel = req.body.priorityLevel;

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const db = firebase.database();

        // add new message to group messages and return new message key
        const newMessageKey = db.ref().child(`groups/${groupId}/messages/`)
        .push(true).key;

        // store message details in message node
        db.ref().child(`messages/${newMessageKey}`).set({
          message: newMessage,
          sender: messageSender,
          priority: priorityLevel
        });

        res.send({
          message: 'Message Sent'
        });

        // send email notifications
        getUsersEmailsNumbers(firebase, groupId, priorityLevel, sendNotifications);
      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
