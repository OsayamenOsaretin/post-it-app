import PostItActionTypes from '../../flux/ActionTypes';

/* global jest */
jest.mock('../../flux/Dispatcher');

describe('PostItErrorStore', () => {
  const loginError = {
    action: {
      type: PostItActionTypes.LOGIN_ERROR,
      errorMessage: 'testLoginError'
    }
  };

  const registerError = {
    action: {
      type: PostItActionTypes.REGISTER_ERROR,
      errorMessage: 'testRegisterError'
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItErrorStore;

  beforeEach(() => {
    jest.resetModules();
    PostItErrorStore = require('../../flux/stores/ErrorStore').default;   // eslint-disable-line
    PostItDispatcher = require('../../flux/Dispatcher').default;    // eslint-disable-line
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

  it('should update login error status after receiving login error payload',
    () => {
      callback(loginError);
      const errorStatus = PostItErrorStore.getLoginError();
      expect(errorStatus).toBe('testLoginError');
    });

  it('should update register error status after receiving register error',
    () => {
      callback(registerError);
      const errorStatus = PostItErrorStore.getRegisterError();
      expect(errorStatus).toBe('testRegisterError');
    });

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItErrorStore, 'on');
    const mockCallBack = jest.fn();
    PostItErrorStore.addChangeListener(mockCallBack);
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItErrorStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItErrorStore.removeChangeListener(mockCallBack);
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });
});
