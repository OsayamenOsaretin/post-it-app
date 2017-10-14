// get emails for users in a group

const getEmailNumbers = (userIds, db, emails, numbers) => {
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
          resolve();
        });
      });
    })
  ));
};

export default (firebase, groupId, priorityLevel, callback) => {
  const db = firebase.database();
  const userIds = [];
  const emails = [];
  const numbers = [];

  const groupReference = db.ref(`groups/${groupId}/users`);
  return groupReference.once('value', (snapshot) => {
    // get the user Ids
    snapshot.forEach((userSnapshot) => {
      userIds.push(userSnapshot.key);
    });
    const promises = getEmailNumbers(userIds, db, emails, numbers);
    return Promise.all(promises)
      .then(() => {
        callback(emails, numbers, priorityLevel);
      });
  });
};
