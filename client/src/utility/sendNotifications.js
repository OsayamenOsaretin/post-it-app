import request from 'superagent';
import Dispatcher from '../Dispatcher';
import ActionTypes from '../ActionTypes';

/**
 *@param {Array} emails
 *@param {Array} numbers
 *@param {String} priorityLevel
 *
 *@return {Function} dispatcher dispatch
 */
export default (emails, numbers, priorityLevel) => {
  request
    .post('/notifications')
    .send({ emails, numbers, priorityLevel
    })
    .end((error) => {
      if (error) {
        return Dispatcher.handleServerAction({
          type: ActionTypes.FAILED_NOTIFICATIONS
        });
      }
      return Dispatcher.handleServerAction({
        type: ActionTypes.NOTIFICATIONS_SENT
      });
    });
};
