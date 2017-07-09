import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';


/**
 * getAllUsersAction - get all the PostIt registered users
 * @returns {void}
 */
export default () => {
  request
  .get('/users')
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      const userList = result.body.userList;
      console.log(userList);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RECIEVE_USERS,
        users: userList
      });
    }
  });
};
