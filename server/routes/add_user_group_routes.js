// route to add user to a group

module.exports = (app, firebase) => {
  app.post('/group/:groupId/user', (req, res) => {
    // collect the group from url
    const groupId = req.params.groupId;
    const newUserId = req.body.userId;
    const db = firebase.database();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // const userId = user.uid;
        const groupRef = db.ref(`/groups/${groupId}/users`);
        groupRef.child(newUserId).set({
          Id: newUserId,
        });

        res.send({
          message: 'User added to group',
        });
      } else {
        res.send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
