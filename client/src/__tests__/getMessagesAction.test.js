import GetMessagesAction from 'GetMessagesAction';
import PostItActionTypes from '../data/PostItActionTypes';

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('getMessagesAction', () => {
  let PostItDispatcher;

  const groupId = {
    groupId: 'testId'
  };

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action to message store on success', () => {
    GetMessagesAction(groupId);
    expect(PostItDispatcher.handleServerAction.mock.calls.length).toBe(1);
  });

  it('should call dispatcher with the right type, result, id', () => {
    GetMessagesAction(groupId);
    expect(PostItDispatcher.handleServerAction).toHaveBeenLastCalledWith({
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: 'testId',
      messages: {
        1: { message: 'test message' }
      }
    });
  });
});
