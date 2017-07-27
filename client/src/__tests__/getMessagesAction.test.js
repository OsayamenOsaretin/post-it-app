import GetMessagesAction from 'GetMessagesAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
// jest.mock('GetMessagesAction', () => jest.fn());
jest.mock('../data/PostItDispatcher');

describe('getMessagesAction', () => {
  let PostItDispatcher;

  // const groupId = {
  //   groupId: 'testId'
  // };

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action of type got messages on success', () => {
    GetMessagesAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.SUCCEED_GET_MESSAGES
    });
  });

  it('should dispatch server action to handle fail scenario', () => {
    require('superagent').__setMockError({
      message: 'get all users failed'
    });
    GetMessagesAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GET_MESSAGES
    });
  });
});
