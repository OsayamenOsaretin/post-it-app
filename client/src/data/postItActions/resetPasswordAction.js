import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


/**
 * Reset password action
 * @export
 * @function
 * @returns {void}
 * @param {*} email
 */
export default function ResetPassword(email) {
  console.log('superagent api call to login');
  request
  .post('user/reset-password')
  .send(email)
  .end((error, result) => {
    console.log('api call returned a result');
    if (error) {
      console.log(error);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.FAILED_RESET_PASSWORD
      });
    } else {
      console.log(result);
      PostItDispatcher.handleServerAction({
        type: PostItActionTypes.RESET_MESSAGE_SENT
      });
    }
  });
}
