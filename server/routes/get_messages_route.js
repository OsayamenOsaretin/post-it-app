// gets messages for a specific group

module.exports = (app, firebase) => {
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
        messagesReference.once('value', (snapshot) => {
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
              messageReference.once('value', (snap) => {
                messages.set(messageKey, snap.val());
                console.log(messages);
                resolve();
              });
            })
          ));
          // collect resolved promises
          Promise.all(promises)
          .then(() => {
            res.send({
              message: 'Returned messages',
              groupMessages: messages
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
