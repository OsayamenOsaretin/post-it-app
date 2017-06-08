import axios from 'axios';
import PostItActionTypes from '../PostItActionTypes';


/**
 *registerUserAction - registers a new user and dispatches to Log in user
 * @export
 * @function
 * @returns {void}
 * @param {newUserDetails} newUserDetails
 */
export default newUserDetails => (
  (dispatch) => {
    axios.post('user/signup', {
      body: newUserDetails
    })
    .then(() => {
      dispatch({
        type: PostItActionTypes.LOGIN_USER,
      });
    })
    .catch((err) => {
      dispatch({
        type: PostItActionTypes.FAILED_REGISTER,
        err: err.message,
        status: 'failed'
      });
    });
  }
);

