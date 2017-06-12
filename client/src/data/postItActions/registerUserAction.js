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
        // dispatch action to Login user on successful registration
        PostItDispatcher.handleViewAction({
          actionType: PostItActionTypes.LOGIN_USER,
        });
      } else {
        PostItDispatcher.handleViewAction({
          actionType: PostItActionTypes.FAILED_REGISTER,
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

