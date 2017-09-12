import { mockAuth, mockDatabase } from 'firebase';
import signOut from '../controllerFunctions/signOut';

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
  },
  params: {
    userId: 'testUserId'
  }
};

describe('SignOut', () => {
  it('should send message when operation is successful', (done) => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    signOut(request, result).then(() => {
      expect(result.send).toHaveBeenCalledWith({
        message: 'You are successfully signed out'
      });
      done();
    });
  });
});
