import { mockAuth, mockDatabase } from 'firebase';
import getMessagesAction from '../../src/actions/getMessagesAction';
import PostItActionTypes from '../../src/ActionTypes';
import PostItDispatcher from '../../src/Dispatcher';

/* global jest localStorage */

jest.mock('firebase');
jest.mock('../../src/Dispatcher');
Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = () => {
  return 'testUser';
};
localStorage.setItem = jest.fn();

const testMessage = {
  message: 'This is test message 1',
  sender: 'testUser1',
  read: {
    testUser2: true
  }
};

const messagesRef = mockDatabase.child('/messages');
const groupMessagesRef = mockDatabase
  .child('/groups/testGroupId/messages');

messagesRef.set({
  testMessage1: testMessage
});

groupMessagesRef.set({
  testMessage1: true
});

mockDatabase.flush();

describe('getMessagesAction', () => {
  const groupId = {
    groupId: 'testGroupId'
  };

  it('should dispatch server action of type recieve messages on success', async () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    messagesRef.set({
      testMessage1: testMessage
    });
    const groupMessageMap = new Map();
    groupMessageMap.set('testMessage1', testMessage);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    await getMessagesAction(groupId);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: 'testGroupId',
      messages: groupMessageMap,
      notify: true
    });
  });

  it('should dispatch action with notify as false when messages has been read', async () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    testMessage.read = {
      testUser: true
    };
    messagesRef.set({
      testMessage1: testMessage
    });
    const groupMessageMap = new Map();
    groupMessageMap.set('testMessage1', testMessage);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    await getMessagesAction(groupId);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: 'testGroupId',
      messages: groupMessageMap,
      notify: false
    });
  });

  it('should dispatch server action with notify as true when messages from someone has not been read', async () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    testMessage.read = undefined;
    messagesRef.set({
      testMessage1: testMessage
    });
    const groupMessageMap = new Map();
    groupMessageMap.set('testMessage1', testMessage);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    await getMessagesAction(groupId);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: 'testGroupId',
      messages: groupMessageMap,
      notify: true
    });
  });

  it('should dispatch server action to handle failed authentication scenario', () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    getMessagesAction(groupId);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GET_MESSAGES
    });
  });
});
