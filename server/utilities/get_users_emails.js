// get emails for users in a group

module.exports = (firebase, groupId, priorityLevel, callback) => {
  const db = firebase.database();
  const emails = [];
  const userIds = [];

  const groupReference = db.ref(`groups/${groupId}/users`);
  groupReference.once('value', (snapshot) => {
    // get the emails for each user

    // get the user Ids
    snapshot.forEach((userSnapshot) => {
      userIds.push(userSnapshot.key);
    });

    const promises = userIds.map(userId => (
      new Promise((resolve) => {
        const userEmailRef = db.ref(`users/${userId}/email`);
        userEmailRef.once('value', (userEmail) => {
          emails.push(userEmail.val());
          resolve();
        });
      })
    ));
    return Promise.all(promises)
    .then(() => (
      callback(emails, priorityLevel)
    ));
  });
};
