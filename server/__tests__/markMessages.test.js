import io from 'io'; // eslint-disable-line
import { mockDatabase } from 'firebase';
import markMessages from '../controllerFunctions/markMessages';

/* global jest */

jest.mock('io', () => ({
  emit: jest.fn()
}));

const testMessages = new Map();
testMessages.set('testMessage1', 'testMessageBody');
testMessages.set('testMessage2', {
  message: 'body',
  sender: 'testUser2'
});

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
    userId: 'testUserId',
    user: {
      displayName: 'testUser1'
    },
  }
};

const newRequest = {
  body: {
    userId: 'testUserId',
    user: {
      displayName: 'testDisplayName'
    },
    messages: testMessages
  }
};

const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: true
});
mockDatabase.flush();

describe('MarkMessages', () => {
  it('should mark no messages when none are sent', () => {
    markMessages(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'no messages read'
    });
  });

  it('should return error message when authentication fails', () => {
    userRef.set({
      signedIn: false
    });
    markMessages(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'You are not signed in right now!'
    });
  });

  it('should mark messages when messages are sent', () => {
    userRef.set({
      signedIn: true
    });
    markMessages(newRequest, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'messages well read'
    });
  });
});
