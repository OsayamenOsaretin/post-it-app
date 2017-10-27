import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {*} idToken
 */
export default function GoogleSignInAction(idToken) {
  request
    .post('user/google/signin')
    .send(idToken)
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_GOOGLE_LOGIN
        });
      } else {
        const userData = result.body.userObject;
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_USER,
          user: userData
        });
      }
    });
}
