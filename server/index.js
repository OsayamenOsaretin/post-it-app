import notifications from './notifications';

export default (app) => {
  app.post('/notifications', notifications);
};
