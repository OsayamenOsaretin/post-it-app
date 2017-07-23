import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('../data/PostItDispatcher');

describe('PostItMessageStore', () => {
  // message payload
  const recieveMessages = {
    action: {
      type: PostItActionTypes.RECIEVE_MESSAGE_RESPONSE,
      Id: 'testId',
      messages: [['message', 'test-message']]
    }
  };

  const readMessages = {
    action: {
      type: PostItActionTypes.READ_MESSAGE,
      Id: 'testId'
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItMessageStore;

  beforeEach(() => {
    jest.resetModules();
    PostItMessageStore = require('../data/postItStores/PostItMessageStore');
    PostItDispatcher = require('../data/PostItDispatcher');
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should update map of messages in on recieve callback', () => {
    callback(recieveMessages);
    expect((PostItMessageStore.getMessage('testId')).size).toBeGreaterThan(0);
  });

  it('should emit change on receive mark read dispatch', () => {
    const spyEmit = spyOn(PostItMessageStore, 'emit');
    callback(readMessages);
    expect(spyEmit).toHaveBeenCalled();
  });
});
