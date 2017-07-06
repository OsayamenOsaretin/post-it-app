import GetMessagesAction from 'GetMessagesAction';
import sendMessageAction from 'SendMessageAction';
import PostItActionTypes from '../data/PostItActionTypes';

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');
jest.mock('GetMessagesAction', () => jest.fn());

describe('sendMessageAction', () => {
  const messageDetails = {
    groupId: 'testId'
  };

  beforeEach(() => {
    jest.resetMocks();
  });

  it('should get messages after successfully sending messages', () => {
    sendMessageAction(messageDetails);
    expect(GetMessagesAction.mock.calls.length).toBe(1);
  });
});
