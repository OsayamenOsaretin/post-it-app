import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {*} idToken
 */
export default function GoogleSignInAction(idToken) {
  console.log('superagent api call to login');
  request
  .post('user/google/signin')
  .send(idToken)
  .end((error, result) => {
    console.log('google api call returned a result');
    if (error) {
      console.log(error);
    } else {
      const userData = result.body.userObject;
      console.log(userData);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.LOGIN_USER,
        user: userData
      });
    }
  });
}
