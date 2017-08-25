// import seperate route modules

// import signUpRoute from './user_signup_route';
// import signInRoute from './user_signin_route';
// import createGroup from './create_group_routes';
// import addUser from './add_user_group_routes';
// import signOut from './sign_out_route';
// import getGroups from './get_groups_route';
// import sendMessage from './send_message_route';
// import getUsers from './get_all_users_route';
// import getMessages from './get_messages_route';
// import googleSignInRoute from './google_signin_route';
// import resetPassword from './reset_password_route';
// import markRead from './mark_messages_read_route';
// import resolveGroupRequest from './resolve_group_request';

// import {
//   userSignIn,
//   userSignOut,
//   userResetPassword,
//   googleSignIn
// } from './controllers/users';
import users from './controllers/users';
import groups from './controllers/groups';
import messages from './controllers/messages';
// import {
//   resolveGroupRequest,
//   createGroup,
//   getGroups,
//   addUserGroup,
//   getUsersNotInGroup
// } from './controllers/groups';
// import {
//   getMessages,
//   markMessages,
//   sendMessages
// } from './controllers/messages';

export default (app, firebase, io) => {
  // These are the endpoints for the post-it api
  app.post('/user/signup', users.userSignIn);
  // console.log(signUp);
  // signUpRoute(app, firebase);
  app.post('/user/signin', users.userSignIn);
  // signInRoute(app, firebase);
  app.post('/group', groups.createGroup);
  // createGroup(app, firebase);
  app.post('/group/:groupId/user', groups.addUserGroup);
  // addUser(app, firebase);
  app.get('/signout', users.userSignOut);
  // signOut(app, firebase);
  app.get('/groups/:userId', groups.getGroups);
  // getGroups(app, firebase, io);
  app.post('/message', messages.sendMessages);
  // sendMessage(app, firebase);
  app.post('/users', groups.getUsersNotInGroup);
  // getUsers(app, firebase, io);
  app.post('/group/messages', messages.getMessages);
  // getMessages(app, firebase, io);
  app.post('/user/google/signin', users.googleSignIn);
  // googleSignInRoute(app, firebase);
  app.post('user/reset-password', users.userResetPassword);
  // resetPassword(app, firebase);
  app.post('/read', messages.markMessages);
  // markRead(app, firebase);
  app.post('/requests', groups.resolveGroupRequest);
  // resolveGroupRequest(app, firebase);
};
