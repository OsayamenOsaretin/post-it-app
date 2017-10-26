import notificationController from './controllerFunctions/sendNotifications';
import users from './controllers/users';
import groups from './controllers/groups';
import messages from './controllers/messages';
import authMiddleware from './middleware/authenticationMiddlware';

export default (app) => {
  app.post('/notifications', authMiddleware, notificationController);

  app.post('/user/signin', users.userSignIn);
  app.post('/user/signup', users.userSignUp);
  app.post('/user/google/signin', users.googleSignIn);
  app.get('/signout', users.userSignOut);
  app.post('/user/reset-password', users.userResetPassword);

  app.post('/group/:groupId/user', authMiddleware, groups.addUserGroup);
  app.post('/users', authMiddleware, groups.getUsersNotInGroup);
  app.post('/requests', authMiddleware, groups.resolveGroupRequest);
  app.post('/group', authMiddleware, groups.createGroup);
  app.get('/groups/:userId', authMiddleware, groups.getGroups);

  app.post('/group/messages', authMiddleware, messages.getMessages);
  app.post('/read', authMiddleware, messages.markMessages);
  app.post('/message', authMiddleware, messages.sendMessages);
};
