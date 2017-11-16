import lodash from 'lodash';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';
import { getAuth, getDatabase } from '../firebaseHelpers';


/**
 * searchUsersAction - get all the PostIt registered users matching search
 * 
 * @returns {void}
 * 
 * @param {Object} groupId, search
 */
export default ({ groupId, search }) => {
  const auth = getAuth();
  const database = getDatabase();
  auth.onAuthStateChanged((user) => {
    if (user) {
      const users = new Map();

      const usersNotInGroup = new Map();

      const usersInGroupRef = database.ref(`/groups/${groupId}/users`);

      const userReference = database.ref('users');
      userReference.orderByChild('username')
        .startAt(search)
        .endAt(`${search}\uf8ff`)
        .once('value', (snapshot) => {
          const searchedUsers = [];
          users.set(snapshot.key, snapshot.val());
          searchedUsers.push(snapshot.key);
          usersInGroupRef.once('value', (groupSnapshot) => {
            const friends = [];
            let usersNotInGroupKeys = [];

            groupSnapshot.forEach((userInGroupSnapshot) => {
              friends.push(userInGroupSnapshot.key);
            });
            // find the users not in group using lodash
            usersNotInGroupKeys = lodash
              .difference(searchedUsers, friends);
            usersNotInGroupKeys.forEach((userNotInGroupKey) => {
              usersNotInGroup
                .set(userNotInGroupKey, users.get(userNotInGroupKey));
            });
            PostItDispatcher.handleServerAction({
              type: PostItActionTypes.RECEIVE_SEARCHED_USERS,
              users: usersNotInGroup,
              id: groupId
            });
          });
        });
    } else {
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.LOGIN_ERROR
      });
    }
  });
};
