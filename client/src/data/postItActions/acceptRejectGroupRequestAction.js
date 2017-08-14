import request from 'superagent';

export default (groupInviteDetails) => {
  request
    .post('/requests')
    .send(groupInviteDetails)
    .then((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
};
