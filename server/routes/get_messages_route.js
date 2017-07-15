// gets messages for a specific group

module.exports = (app, firebase, io) => {
  app.post('/group/messages', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const messages = new Map();

        const db = firebase.database();

        // get group Id
        const groupId = req.body.groupId;
        const messagesReference = db.ref(`groups/${groupId}/messages`);

        // store message keys
        const messageKeys = [];

        // get message Id from groups and iterate through messages node
        messagesReference.on('child_added', (snapshot) => {
          messageKeys.push(snapshot.key);
          console.log(messageKeys);

          const messageReference = db.ref(`messages/${snapshot.key}`);
          messageReference.on('value', (snap) => {
            const newMessage = new Map();
            newMessage.set(snapshot.key, snap.val());
            messages.set(snapshot.key, snap.val());
            io.emit('newMessage', {
              groupMessages: newMessage,
              Id: groupId
            });
          });
        });
      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
