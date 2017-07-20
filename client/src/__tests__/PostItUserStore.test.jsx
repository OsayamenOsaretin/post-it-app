import PostItActionTypes from '../data/PostItActionTypes';

/* global jest localStorage window */

jest.mock('../data/PostItDispatcher');
Object.defineProperty(window, 'localStorage', { value: jest.fn() });
localStorage.getItem = jest.fn();
localStorage.setItem = jest.fn();

describe('PostItUserStore', () => {
  const loginUser = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.LOGIN_USER,
      user: {
        displayName: 'test name',
        stsTokenManager: {
          accessToken: 'test token'
        }
      }
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItMessageStore;

  beforeEach(() => {
    jest.resetModules();
    PostItMessageStore = require('../data/postItStores/PostItUserStore');
    PostItDispatcher = require('../data/PostItDispatcher');
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should store display name and token in local storage on login', () => {
    callback(loginUser);
    expect(localStorage.setItem.mock.calls.length).toBe(2);
  });

  it('should get token item from local storage when get signed in state called', () => {
    expect(PostItMessageStore.getSignedInState()).toBe(localStorage.getItem('token'));
  });
});
