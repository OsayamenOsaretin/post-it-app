import PostItActionTypes from '../data/PostItActionTypes';

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
});
