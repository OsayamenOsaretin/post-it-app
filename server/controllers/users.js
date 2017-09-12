import userResetPassword from '../controllerFunctions/resetPassword';
import userSignIn from '../controllerFunctions/userSignIn';
import userSignUp from '../controllerFunctions/userSignUp';
import userSignOut from '../controllerFunctions/signOut';
import googleSignIn from '../controllerFunctions/googleSignIn';

const users = {
  // signIn: userSignIn,
  // signUp: userSignUp,
  // signOut: userSignOut,
  // resetPassword: userResetPassword,
  userSignIn,
  userSignUp,
  userSignOut,
  googleSignIn,
  userResetPassword
};

export default users;

