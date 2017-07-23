import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */
jest.mock('../data/PostItDispatcher');

describe('PostItErrorStore', () => {
  const loginError = {
    action: {
      type: PostItActionTypes.LOGIN_ERROR
    }
  };

  const registerError = {
    action: {
      type: PostItActionTypes.REGISTER_ERROR
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItErrorStore;

  beforeEach(() => {
    jest.resetModules();
    PostItErrorStore = require('../data/postItStores/PostItErrorStore');
    PostItDispatcher = require('../data/PostItDispatcher');
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should emit change on recieving login error payload', () => {
    const emitSpy = spyOn(PostItErrorStore, 'emit');
    callback(loginError);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should emit change on receiving register error payload', () => {
    const emitSpy = spyOn(PostItErrorStore, 'emit');
    callback(registerError);
    expect(emitSpy).toHaveBeenCalled();
  });
});
