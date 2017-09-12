import notificationController from './controllerFunctions/sendNotifications';

export default (app) => {
  app.post('/notifications', notificationController);
};
