// get emails for users in a group

const getEmailNumbers = (userIds, db) => {
  const emails = [];
  const numbers = [];
  return userIds.map(userId => (
    new Promise((resolve) => {
      // get user emails
      const userEmailRef = db.ref(`users/${userId}/email`);
      userEmailRef.once('value', (userEmail) => {
        emails.push(userEmail.val());

        // get user numbers
        const userNumberRef = db.ref(`users/${userId}/number`);
        userNumberRef.once('value', (userNumber) => {
          numbers.push(userNumber.val());
          resolve({ emails, numbers });
        });
      });
    })
  ));
};

export default (firebase, groupId, priorityLevel, callback) => {
  const db = firebase.database();
  const userIds = [];

  const groupReference = db.ref(`groups/${groupId}/users`);
  return groupReference.once('value', (snapshot) => {
    // get the user Ids
    snapshot.forEach((userSnapshot) => {
      userIds.push(userSnapshot.key);
    });
    const promises = getEmailNumbers(userIds, db);
    return Promise.all(promises)
      .then(({ emails, numbers }) => {
        callback(emails, numbers, priorityLevel);
      });
  });
};
