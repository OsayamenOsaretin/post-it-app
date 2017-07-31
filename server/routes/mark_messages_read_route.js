// mark read messages route

module.exports = (app, firebase) => {
  app.post('/read', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userName = user.displayName;
        const messages = req.body.messages;

        const db = firebase.database();
        const messageRef = db.ref('messages');

        if (messages) {
          Object.keys(messages).forEach((messageId) => {
            if (userName !== messages[messageId].sender) {
              messageRef.child(`${messageId}/read/${userName}`).set(true);
            }
          });
          res.send({
            message: 'messages well read'
          });
        } else {
          res.send({
            message: 'no messages read'
          });
        }
      } else {
        res.status(403).send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
