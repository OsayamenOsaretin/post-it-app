import request from 'superagent';
import PostItActionTypes from '../PostItActionTypes';
import PostItDispatcher from '../PostItDispatcher';

/**
 * sendMessageAction - sends a new message to a group
 * @param {*} messageDetails
 * @return {void}
 */
export default (messageDetails) => {
  console.log('reaches send message action');
  request
  .post('/message')
  .send(messageDetails)
  .end((error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
  });
};
