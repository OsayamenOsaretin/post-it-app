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

        // get message Id from groups and iterate through messages node
        messagesReference.on('value', (snapshot) => {
          // store message keys
          const messageKeys = [];

          snapshot.forEach((messageSnapshot) => {
            messageKeys.push(messageSnapshot.key);
          });
          console.log(messageKeys);

          // map to promises to asynchronously collect messages
          const promises = messageKeys.map(messageKey => (
            new Promise((resolve) => {
              const messageReference = db.ref(`messages/${messageKey}`);
              messageReference.on('value', (snap) => {
                messages.set(messageKey, snap.val());
                resolve();
              });
            })
          ));
          // collect resolved promises
          Promise.all(promises)
          .then(() => {
            io.emit('newMessage', {
              groupMessages: messages,
              Id: groupId
            });
          })
          .catch(() => {
            res.status(401).send({
              message: 'Something went wrong'
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
