import GetMessagesAction from 'GetMessagesAction';
import sendMessageAction from 'SendMessageAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');
jest.mock('GetMessagesAction', () => jest.fn());

describe('sendMessageAction', () => {
  const messageDetails = {
    groupId: 'testId'
  };

  let PostItDispatcher;

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should get messages after successfully sending messages', () => {
    sendMessageAction(messageDetails);

    expect(PostItDispatcher.handleServerAction.mock.calls.length).toBe(1);
  });

  it('should dispatch error payload when send message unsuccessful', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    sendMessageAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_SEND_MESSAGE
    });
  });
});
