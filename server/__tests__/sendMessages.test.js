import { mockDatabase } from 'firebase';
import sendMessages from '../controllerFunctions/sendMessages';

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
    email: 'testEmail@email.com',
    message: {},
    groupId: 'testGroupId',
    sender: 'testSender',
    priorityLevel: 'normal',
    userId: 'testUserId'
  }
};

const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: true
});

describe('SendMessages', () => {
  it('should send appropriate message when all goes well', () => {
    sendMessages(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalled();
  });

  it('should send error message when authentication fails', () => {
    userRef.set({
      signedIn: false
    });
    sendMessages(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'You are not signed in right now!'
    });
  });
});
