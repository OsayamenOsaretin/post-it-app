
// get a users groups

module.exports = (app, firebase, io) => {
  app.get('/groups/:userId', (req, res) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // user is signed in
        const userId = req.params.userId;
        const db = firebase.database();

        // instantiate empty Map to hold groups
        const groups = new Map();

        // instantiate empty Map to hold requests
        const requests = new Map();

        let requestKeys = [];
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

        const requestReference = db.ref(`/users/${userId}/requests`);

        requestReference.orderByKey().on('value', (snapshot) => {
          // clear groups map and keys to remove leaks between users
          requests.clear();
          requestKeys = [];
          // get the keys for each user's group
          snapshot.forEach((requestSnapshot) => {
            requestKeys.push(requestSnapshot.key);
          });
          // console.log(`requestKeys: ${requestKeys}`);

          // map to promises to asynchronously collect group request info
          const promises = requestKeys.map(requestKey => (
            new Promise((resolve) => {
              const groupReference = db.ref(`/groups/${requestKey}`);
              groupReference.on('value', (snap) => {
                // add group info to list of groups
                requests.set(requestKey, snap.val());
                resolve();
              });
            })
          ));
          // collect resolved promises
          Promise.all(promises)
            .then(() => {
              // console.log('emits new requests');
              console.log(requests);
              io.emit(`newRequests${userId}`, requests);
            })
            .catch((err) => {
              io.emit('failedRequests', {
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
