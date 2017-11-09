/**
 * friend email creator collects firebase errors and returns nice error messages
 * @param {Object} error
 *
 * @returns {String} errorMessage
 */
export default function prettyErrorMessages(error) {
  const errorType = error.code;
  switch (errorType) {
  case 'auth/network-request-failed':
    return 'Please check your internet and try again';

  case 'auth/email-already-in-use':
    return 'Email already in use, please choose another email address';

  case 'auth/user-not-found':
  case 'auth/wrong-password':
    return 'Email or Password is incorrect, please try again';

  default:
    return 'Something went wrong, please try again';
  }
}
