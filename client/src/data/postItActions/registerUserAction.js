import axios from 'axios';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';


/**
 *registerUserAction - registers a new user and dispatches to Log in user
 * @export
 * @function
 * @returns {void}
 * @param {newUserDetails} newUserDetails
 */
export default newUserDetails => (
    axios.post('user/signup', {
      body: newUserDetails
    })
    .then((res) => {
      if (res.status === 200) {
        // dispatch action to get groups on successful registration
        PostItDispatcher.handleServerAction({
          type: PostItActionTypes.LOGIN_USER,
        });
      } else {
        PostItDispatcher.handleViewAction({
          type: PostItActionTypes.FAILED_REGISTER,
          error: res.message,
          status: 'failed'
        });
      }
    })
    .catch((err) => {
      PostItDispatcher.handleViewAction({
        actionType: PostItActionTypes.FAILED_REGISTER,
        error: err.message,
        status: 'failed'
      });
    })
);

