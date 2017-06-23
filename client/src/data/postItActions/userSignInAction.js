import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {*} userDetails
 */

export default (userDetails) => {
  console.log('superagent api call to login');
  request
  .post('user/signin')
  .send(userDetails)
  .end((error, result) => {
    console.log('api call returned a result');
    if (error) {
      console.log(error);
    } else {
      const userData = result.body.userData;
      console.log(userData);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.LOGIN_USER,
        user: userData
      });
    }
  });
};

