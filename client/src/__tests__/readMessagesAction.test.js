import ReadMessagesAction from 'ReadMessagesAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('readMessagesAction', () => {
  const messages = {
    message1: 'test message'
  };
  const groupId = 'testGroupId';

  let PostItDispatcher;
  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch payload to read messages in message store', () => {
    ReadMessagesAction(messages, groupId);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.READ_MESSAGE,
      Id: groupId
    });
  });
});
