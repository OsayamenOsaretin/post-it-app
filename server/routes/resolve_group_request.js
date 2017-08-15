// send group request to new user

module.exports = (app, firebase) => {
  app.post('/requests', (req, res) => {
    const status = req.body.status;
    const Id = req.body.groupId;
    const userId = req.body.userId;

    const db = firebase.database();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // const userId = user.uid;
        if (status === 'true') {
          // if user accepted the group request
          console.log('user accepted group request')
          const groupRef = db.ref(`/groups/${Id}/users/${userId}`);

          // add user to the group
          groupRef.set({
            Id: userId
          });

          // add group to user's list of groups
          db.ref(`/users/${userId}/groups/${Id}`).set(true);
        }
        // remove request
        db.ref(`/users/${userId}/requests/${Id}`).remove();
        res.send({
          message: 'group request resolved'
        });
      } else {
        res.send({
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};
