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
    axios.post('user/signin', {
      body: userDetails
    })
    .then((res) => {
      if (res.status === 200) {
        // dispatch action to get groups(view) in the case of successful login
        PostItDispatcher.handleViewAction({
          actionType: PostItActionTypes.GET_GROUPS,
        });
        // dispatch action to get groups(server) in the case of successful login
        PostItDispatcher.handleServerAction({
          actionType: PostItActionTypes.GET_GROUPS
        });
      } else {
        PostItDispatcher.handleViewAction({
          actionType: PostItActionTypes.FAILED_SIGNIN,
          error: res.message,
          status: 'failed'
        });
      }
    })
    .catch((err) => {
      PostItDispatcher.handleViewAction({
        actionType: PostItActionTypes.FAILED_SIGNIN,
        error: err.message,
        status: 'failed'
      });
    })
);
