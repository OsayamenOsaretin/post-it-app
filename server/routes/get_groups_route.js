// get a users groups

module.exports = (app, firebase, io) => {
  app.get('/groups/:userId', (req, res) => {
    // const users = new Map();
    const users = [];
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);
        // const userId = user.uid;
        const userId = req.params.userId;
        // console.log(req);
        console.log(userId);
        // users.set(userId, user);

        users.push(userId);
        // instantiate empty Map to hold groups
        const groups = new Map();

        const groupKeys = [];
        users.map((currentUserId) => {
          // user is signed in
          // const currentUserId = currentUser.uid;
          const db = firebase.database();

          // get user's groups
          const groupsReference = db.ref(`/users/${currentUserId}/groups/`);
          groupsReference.on('value', (snapshot) => {
          // get the keys for each user's group
            snapshot.forEach((groupSnapshot) => {
              groupKeys.push(groupSnapshot.key);
            });
            // map to promises to asynchronously collect group info
            const promises = groupKeys.map(groupKey => (
              new Promise((resolve) => {
                const groupReference = db.ref(`/groups/${groupKey}`);
                groupReference.on('value', (snap) => {
                  // add group info to list of groups
                  groups.set(groupKey, snap.val());
                  resolve();
                });
              })
            ));
            // collect resolved promises
            Promise.all(promises)
              .then(() => {
                console.log(groups);
                console.log(`newGroup${currentUserId}`);
                io.emit(`newGroup${currentUserId}`, groups);
              })
              .catch((err) => {
                io.emit('failedGroup', {
                  error: err
                });
              });
          });
          return true;
        });
        // res.send({
        //   message: 'Groups Returned'
        // });
      } else {
        res.status(403).send({
          // user is not signed in
          message: 'You are not signed in right now!'
        });
      }
    });
  });
};

