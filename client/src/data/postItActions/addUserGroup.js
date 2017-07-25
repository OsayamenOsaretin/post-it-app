import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';

/**
 * addUserToGroups - sends a new message to a group
 * @param {*} Details
 * @return {void}
 */
export default (Details) => {
  const user = Details.userId;
  const groupId = Details.groupId;

  console.log(user);
  console.log(groupId);

  console.log('reaches add user action');
  request
  .post(`/group/${groupId}/user`)
  .send({
    userId: user
  })
  .end((error, result) => {
    if (error) {
      console.log(error);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_ADD_USER
      });
    } else {
      console.log(result);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.DELETE_USER,
        id: user,
        groupId: Details.groupId
      });
    }
  });
};
