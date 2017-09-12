import { mockAuth } from 'firebase';
import resetPassword from '../controllerFunctions/resetPassword';

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
  editMessageObject: (messageObject) => {
    result.body.message = messageObject;
  }
};

const request = {
  body: {
    email: 'testEmail@email.com'
  }
};

describe('ResetPassword', () => {
  it('should send reset email message when operation succcessful', (done) => {
    mockAuth.autoFlush();
    resetPassword(request, result).then(() => {
      expect(result.send).toHaveBeenCalledWith({
        message: 'reset email sent!'
      });
      done();
    });
  });

  it('should send error status when process fails', (done) => {
    mockAuth.autoFlush();
    const error = new Error('Error');
    mockAuth.failNext('sendPasswordResetEmail', error);
    resetPassword(request, result).then(() => {
      expect(result.send).toHaveBeenCalledWith({
        message: 'Error resetting password: Error'
      });
      done();
    });
  });
});
