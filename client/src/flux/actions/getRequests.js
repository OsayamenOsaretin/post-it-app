import receiveRequests from '../../flux/actions/receiveRequestAction';

/** 
 * @param {String} userId 
 * @param {Object} database
 * 
 * @return {void}
 */
export default function getRequests(userId, database) {
  const requestReference = database.ref(`/users/${userId}/requests`);

  requestReference.orderByKey().on('value', (snapshot) => {
    const requestKeys = [];

    // get the keys for each user's group
    snapshot.forEach((requestSnapshot) => {
      requestKeys.push(requestSnapshot.key);
    });

    requestKeys.map((requestKey) => {
      const groupReference = database.ref(`/groups/${requestKey}`);
      groupReference.on('value', (snap) => {
        const request = new Map();
        request.set(requestKey, snap.val());
        receiveRequests(request);
      });
      return true;
    });
  });
}
