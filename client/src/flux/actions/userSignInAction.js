import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {*} userDetails
 */
export default function SignInAction(userDetails) {
  request
    .post('/user/signin')
    .send(userDetails)
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_ERROR,
          errorMessage: result.body.message
        });
      } else {
        const userData = result.body.userData;
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_USER,
          user: userData
        });
      }
    });
}
