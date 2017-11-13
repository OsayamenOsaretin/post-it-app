import request from 'superagent';
import Dispatcher from '../flux/Dispatcher';

/**
 *@param {Array} emails
 *@param {Array} numbers
 *@param {String} priorityLevel
 *
 *@return {void}
 */
export default (emails, numbers, priorityLevel) => {
  request
    .post('/notifications')
    .send({ emails, numbers, priorityLevel
    })
    .end((error) => {
      if (error) {
        return Dispatcher.handleServerAction({
          type: 'NOTIFICATIONS_FAILED'
        });
      }
      return Dispatcher.handleServerAction({
        type: 'NOTIFICATIONS_SENT'
      });
    });
};
