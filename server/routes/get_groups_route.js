
// get a users groups

module.exports = (app, firebase, io) => {
  app.get('/groups/:userId', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const userId = user.uid;
        const db = firebase.database();

        // instantiate empty Map to hold groups
        const groups = new Map();

        let groupKeys = [];

        // get user's groups
        const groupsReference = db.ref(`/users/${userId}/groups/`);
        groupsReference.orderByKey().on('value', (snapshot) => {
          // clear groups map and keys to remove leaks between users
          groups.clear();
          groupKeys = [];
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
              io.emit(`newGroup${userId}`, groups);
            })
            .catch((err) => {
              io.emit('failedGroup', {
                error: err
              });
            });
        });
        res.send({
          message: 'Groups Returned'
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
