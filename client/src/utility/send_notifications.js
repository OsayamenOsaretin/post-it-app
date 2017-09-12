import request from 'superagent';

export default (emails, numbers, priorityLevel) => {
  request
    .post('/notifications')
    .send({
      emailList: emails,
      phoneNumbers: numbers,
      priority: priorityLevel
    })
    .then((error, result) => {
      if (error) {
        return error;
      }
      return result;
    });
};
