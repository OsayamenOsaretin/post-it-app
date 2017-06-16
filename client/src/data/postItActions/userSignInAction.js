import request from 'superagent';
import PostItDispatcher from '../PostItDispatcher';
import PostItActionTypes from '../PostItActionTypes';


/**
 *userSignInAction - signs in user & dispatches actions to get groups
 * @export
 * @function
 * @returns {void}
 * @param {userDetails} userDetails
 */

export default (userDetails) => {
  console.log('superagent api call to login');
  request
  .post('user/signin')
  .send(userDetails)
  .end((err, res) => {
    console.log('api call returned a result');
    if (err) {
      console.log(err);
    }
  });
};
