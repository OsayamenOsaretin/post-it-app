import io from 'io'; // eslint-disable-line
import { mockDatabase } from 'firebase';
import getMessages from '../controllerFunctions/getMessages';

/* global jest */

jest.mock('io', () => ({
  emit: jest.fn()
}));

const result = {
  send: jest.fn(),
  body: {
    message: '',
  },
  status: (statusCode) => {
    result.status = statusCode;
    return result;
  },
};

const request = {
  body: {
    userId: 'testUserId',
    groupId: 'testGroupId',
    user: {
      displayName: 'testUser'
    }
  }
};

const testMessage = {
  message: 'This is test message 1',
  sender: 'testUser'
};

const messagesRef = mockDatabase.child('/messages/testMessage1');
const groupMessagesRef = mockDatabase
  .child('/groups/testGroupId/messages');

  // populate database
messagesRef.set({
  testMessage1: testMessage
});

groupMessagesRef.set({
  testMessage1: true
});

mockDatabase.flush();


const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: false
});

describe('GetMessages', () => {
  it('should status 401 when authentication fails', () => {
    getMessages(request, result);
    mockDatabase.flush();
    expect(result.status).toBe(401);
  });

  it('should send messages retrieved message when all goes well', () => {
    userRef.set({
      signedIn: true
    });
    getMessages(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'You are not signed in right now!'
    });
  });

  it('should return the correct notification value with new message', () => {
    userRef.set({
      signedIn: true
    });
    testMessage.read = {
      testUser: true
    };
    messagesRef.set({
      testMessage1: testMessage
    });
    getMessages(request, result);
    mockDatabase.flush();
    const groupMessageMap = new Map();
    groupMessageMap.set('testMessage1', testMessage);
    expect(io.emit).toHaveBeenCalledWith('newMessage', {
      notify: true,
      Id: 'testGroupId',
      groupMessages: groupMessageMap
    });
  });
});
