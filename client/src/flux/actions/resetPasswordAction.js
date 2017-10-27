import request from 'superagent';
import PostItDispatcher from '../Dispatcher';
import PostItActionTypes from '../ActionTypes';


/**
 * Reset password action
 * @export
 * @function
 * @returns {void}
 * @param {*} email
 */
export default function ResetPassword(email) {
  request
    .post('user/reset-password')
    .send(email)
    .end((error) => {
      if (error) {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.FAILED_RESET_PASSWORD
        });
      } else {
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.RESET_MESSAGE_SENT
        });
      }
    });
}
