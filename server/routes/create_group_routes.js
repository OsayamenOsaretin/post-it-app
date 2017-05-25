// route to create a group

// requires firebase and express instance

module.exports = (app, firebase) => {
  app.post('/group', (req, res) => {
    const groupName = req.body.groupName;
    // create group with this unfathomable block of code
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
        const userId = user.uid;
        const db = firebase.database();

        const newGroupKey = db.ref().child('groups').push({
          groupname: groupName,
          creator: userId,
          users: [
            userId,
          ],
        }).key;

        db.ref('/users/' + userId).child('groups').push({
          groupKey: newGroupKey,
          name: groupName,
        });


        res.send({
          message: 'Created Group',
        });
      }
    });
  });
};
