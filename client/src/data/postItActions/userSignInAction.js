import axios from 'axios';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';

/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {userDetails} userDetails
 */

export default userDetails => (
  () => {
    axios.post('user/signin', {
      body: userDetails
    })
    .then(() => {
      PostItDispatcher.handleAction({
        type: PostItActionTypes.GET_GROUPS,
      });
    })
    .catch((err) => {
      PostItDispatcher.handleAction({
        type: PostItActionTypes.FAILED_SIGNIN,
        err: err.message,
        status: 'failed'
      });
    });
  }
);
