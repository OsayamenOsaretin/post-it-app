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

module.exports = (userDetails) => {
  console.log('anything');
  return axios.post('/user/signin', userDetails)
    .then((response) => {
      // dispatch action to signin in the case of successful login
      PostItDispatcher.handleViewAction({
        type: PostItActionTypes.LOGIN_USER,
        user: response.data.user
      });
    })
    .catch((err) => {
      if (err.response) {
        console.log('error response came');
      } else if (err.request) {
        console.log('error was sent, but no reponse');
      } else {
        console.log('something went wrong setting up the request');
      }
    });
};

