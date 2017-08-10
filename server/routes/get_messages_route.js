// gets messages for a specific group

module.exports = (app, firebase, io) => {
  app.post('/group/messages', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const messages = new Map();
        const userName = user.displayName;

        const db = firebase.database();

        // get group Id
        const groupId = req.body.groupId;
        const messagesReference = db.ref(`/groups/${groupId}/messages`);

        // store message keys
        const messageKeys = [];

        // keep an array of promises
        const promises = [];

        // notification value will be set if notification should happen
        let notificationValue;

        // get message Id from groups and iterate through messages node
        messagesReference.on('child_added', (snapshot) => {
          promises.push(new Promise((resolve) => {
            messageKeys.push(snapshot.key);
            const messageReference = db.ref(`/messages/${snapshot.key}`);
            messageReference.on('value', (snap) => {
              notificationValue = false;
              const newMessage = snap.val();
              messages.set(snap.key, snap.val());
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
              io.emit('newMessage', {
                groupMessages: messages,
                Id: groupId,
                notify: notificationValue
              });
            });
        });
        res.send({
          message: 'messages retrieved'
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
