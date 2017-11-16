import { mockAuth } from 'firebase';
import readMessagesAction from '../../src/actions/readMessagesAction';
import PostItActionTypes from '../../src/ActionTypes';
import PostItDispatcher from '../../src/Dispatcher';

/* global jest */

jest.mock('../../src/Dispatcher');
jest.mock('firebase');

const testMessages = new Map();
testMessages.set('testMessage1', 'testMessageBody');
testMessages.set('testMessage2', {
  message: 'body',
  sender: 'testUser2'
});

describe('readMessagesAction', () => {
  const messages = {
    messages: testMessages
  };
  const groupId = 'testGroupId';

  it('should dispatch payload to read messages in message store', () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    readMessagesAction(messages, groupId);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.READ_MESSAGE,
      Id: groupId
    });
  });

  it('should dispatch error payload when no authenticated user', () => {
    mockAuth.changeAuthState(undefined);
    readMessagesAction(messages, groupId);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_READ_MESSAGE
    });
  });
});
