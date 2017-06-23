'use strict';

// gets messages for a specific group

module.exports = function (app, firebase) {
  app.post('/group/messages', function (req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // user is signed in
        var messages = new Map();

        var db = firebase.database();

        // get group Id
        var groupId = req.body.groupId;
        var messagesReference = db.ref('groups/' + groupId + '/messages');

        // get message Id from groups and iterate through messages node
        messagesReference.once('value', function (snapshot) {
          // store message keys
          var messageKeys = [];

          snapshot.forEach(function (messageSnapshot) {
            messageKeys.push(messageSnapshot.key);
          });
          console.log(messageKeys);

          // map to promises to asynchronously collect messages
          var promises = messageKeys.map(function (messageKey) {
            return new Promise(function (resolve) {
              var messageReference = db.ref('messages/' + messageKey);
              messageReference.once('value', function (snap) {
                messages.set(messageKey, snap.val());
                console.log(messages);
                resolve();
              });
            });
          });
          // collect resolved promises
          Promise.all(promises).then(function () {
            res.send({
              message: 'Returned messages',
              groupMessages: messages
            });
          }).catch(function () {
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