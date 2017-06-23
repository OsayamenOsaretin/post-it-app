'use strict';

// route to send message to group

module.exports = function (app, firebase) {
  app.post('/message', function (req, res) {
    var newMessage = req.body.message;
    var groupId = req.body.groupId;
    var messageSender = req.body.sender;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var db = firebase.database();

        // add new message to group messages and return new message key
        var newMessageKey = db.ref().child('groups/' + groupId + '/messages/').push(true).key;

        // store message details in message node
        db.ref().child('messages/' + newMessageKey).set({
          message: newMessage,
          sender: messageSender
        });

        res.send({
          message: 'Message Sent'
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