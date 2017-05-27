// route to create a group

// requires firebase and express instance

module.exports = (app, firebase) => {
  app.post('/group', (req, res) => {
    const groupName = req.body.groupName;

    // check that a user is signed in before you try to add group
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // This means a user is signed in
        const userId = user.uid;
        const db = firebase.database();

        // create a new group and return the unique key
        const newGroupKey = db.ref().child('groups').push({
          groupname: groupName,
          creator: userId,
        }).key;

        // add user id to list of group members
        db.ref().child(`groups/${newGroupKey}/users/${userId}`).set({
          Id: userId,
        });

        // add group key to list of a user's group
        db.ref(`/users/${userId}/groups/`).child(newGroupKey).set(
          { id: newGroupKey }
          );

        res.send({
          message: 'Created Group',
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
