import { mockAuth } from 'firebase';
import googleSignIn from '../controllerFunctions/googleSignIn';

/* global jest */

const result = {
  send: jest.fn(),
  body: {
    message: ''
  },
  status: (statusCode) => {
    result.status = statusCode;
    return result;
  },
};

const request = {
  body: {
    idToken: 'testToken'
  }
};

describe('GoogleSignIn', () => {
  it('should sign in user successfully', (done) => {
    mockAuth.autoFlush();
    googleSignIn(request, result).then(() => {
      expect(result.send).toHaveBeenCalled();
      done();
    });
  });

  it('should send error message when sign in fails', (done) => {
    mockAuth.autoFlush();
    const error = new Error('error');
    mockAuth.failNext('signInWithCredential', error);
    googleSignIn(request, result).then(() => {
      expect(result.send).toHaveBeenCalledWith({
        message: 'Error signin in: error'
      });
      done();
    });
  });
});
