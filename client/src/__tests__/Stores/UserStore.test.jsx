import PostItActionTypes from '../../flux/ActionTypes';

/* global jest localStorage window */

jest.mock('../../flux/Dispatcher');
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
        getIdToken: () => (Promise.resolve())
      }
    }
  };

  const resetMessage = {
    action: {
      type: PostItActionTypes.RESET_MESSAGE_SENT
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItUserStore;

  beforeEach(() => {
    jest.resetModules();
    PostItUserStore = require('../../flux/stores/UserStore').default;     // eslint-disable-line
    PostItDispatcher = require('../../flux/Dispatcher').default;    // eslint-disable-line
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should store display name and token in local storage on login', () => {
    callback(loginUser);
    expect(localStorage.setItem.mock.calls.length).toBe(3);
  });

  it('should get token item from local storage when get signed in state called',
    () => {
      expect(PostItUserStore.getSignedInState())
        .toBe(localStorage.getItem('token'));
    });

  it('should set the reset password state', () => {
    callback(resetMessage);
    expect(PostItUserStore.getPasswordResetMessageState()).toBe(true);
  });

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItUserStore, 'on');
    const mockCallBack = jest.fn();
    PostItUserStore.addChangeListener(mockCallBack);
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItUserStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItUserStore.removeChangeListener(mockCallBack);
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });
});
