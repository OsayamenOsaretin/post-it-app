import PostItActionTypes from '../../src/ActionTypes';

/* global jest */

jest.mock('../../src/Dispatcher');

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

  const clearMessageStore = {
    action: {
      type: PostItActionTypes.CLEAR_MESSAGES_STORE
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItMessageStore;

  beforeEach(() => {
    jest.resetModules();
    PostItMessageStore = require('../../src/stores/MessageStore').default;    // eslint-disable-line
    PostItDispatcher = require('../../src/Dispatcher').default;    // eslint-disable-line
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should update map of messages in on recieve callback', () => {
    callback(recieveMessages);
    expect((PostItMessageStore.getMessage('testId')).size).toBe(1);
  });

  it('should emit change on receive mark read dispatch', () => {
    const spyEmit = spyOn(PostItMessageStore, 'emit');
    callback(readMessages);
    expect(spyEmit).toHaveBeenCalled();
  });

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItMessageStore, 'on');
    const mockCallBack = jest.fn();
    PostItMessageStore.addChangeListener(mockCallBack, 'change');
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItMessageStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItMessageStore.removeChangeListener(mockCallBack, 'change');
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItMessageStore, 'on');
    const mockCallBack = jest.fn();
    PostItMessageStore.addNotificationChangeListener(mockCallBack);
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItMessageStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItMessageStore.removeNotificationChangeListener(mockCallBack);
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should clear messages for clear message store payload', () => {
    callback(recieveMessages);
    expect((PostItMessageStore.getMessage('testId')).size).toBe(1);
    callback(clearMessageStore);
    expect((PostItMessageStore.getMessage('testId'))).not.toBeDefined();
  });
});
