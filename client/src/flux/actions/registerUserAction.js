import request from 'superagent';
import PostItActionTypes from '../ActionTypes';
import PostItDispatcher from '../Dispatcher';


/**
 *registerUserAction - registers a new user and dispatches to Log in user
 * @export
 * @function
 * @returns {void}
 * @param {newUserDetails} newUserDetails
 */
export default (newUserDetails) => {
  request
    .post('/user/signup')
    .send(newUserDetails)
    .end((error, result) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.REGISTER_ERROR,
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
};
