import request from 'superagent';
import Dispatcher from '../flux/Dispatcher';

export default (emails, numbers, priorityLevel) => {
  request
    .post('/notifications')
    .send({
      emailList: emails,
      phoneNumbers: numbers,
      priority: priorityLevel
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
