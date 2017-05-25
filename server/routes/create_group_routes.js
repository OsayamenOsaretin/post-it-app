// route to create a group

// requires firebase and express instance

module.exports = (app, firebase) => {
  app.post('/group', (req, res) => {
    const groupName = req.body.groupName;
    // create group with this unfathomable block of code

    // check that a user is signed in before you try to add group
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
        const userId = user.uid;
        const db = firebase.database();

        const newGroupKey = db.ref().child('groups').push({
          groupname: groupName,
          creator: userId,
        }).key;

        db.ref().child(`groups/${newGroupKey}/users/${userId}`).set({
          Id: userId,
        });

        db.ref(`/users/${userId}/groups/`).child(newGroupKey).set(
          { name: groupName }
          );


        res.send({
          message: 'Created Group',
        });
      } else {
        res.send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
