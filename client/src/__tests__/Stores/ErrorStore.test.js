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

  const resetMessageSent = {
    action: {
      type: PostItActionTypes.RESET_MESSAGE_SENT
    }
  };

  const failedReset = {
    action: {
      type: PostItActionTypes.FAILED_RESET_PASSWORD,
      message: 'failed password reset'
    }
  };

  const defaultPayload = {
    action: {
      type: 'DEFAULT_TYPE'
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

  it('should update reset password error after recieving failed_reset payload',
    () => {
      callback(failedReset);
      const errorStatus = PostItErrorStore.getResetPasswordError();
      expect(errorStatus).toBe('failed password reset');
    });

  it('should reset reset password error when action type is reset message sent'
    , () => {
      callback(resetMessageSent);
      const errorStatus = PostItErrorStore.getResetPasswordError();
      expect(errorStatus).toBe('');
    });

  it('should plainly return true for the default action type case', () => {
    const returnValue = callback(defaultPayload);
    expect(returnValue).toBe(true);
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
