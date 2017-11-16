import { mockAuth, mockDatabase } from 'firebase';
import PostItActionTypes from '../../src/ActionTypes';
import googleSignInAction from '../../src/actions/googleSignInAction';
import Dispatcher from '../../src/Dispatcher';
/* global jest */

jest.mock('../../src/Dispatcher');
jest.mock('firebase');

describe('googleSignInAction', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
  });

  it('should dispatch payload to login user on successful sign in ', () => (
    googleSignInAction()
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.LOGIN_USER,
          user: {
            isAnonymous: false,
            providerData: [{
              providerId: 'google.com'
            }]
          }
        });
      })
  ));

  it('should dispatch error payload when sign in fails', () => {
    const error = new Error('error');
    mockAuth.failNext('signInWithPopup', error);
    mockAuth.autoFlush();
    return googleSignInAction()
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_LOGIN,
          errorMessage: 'Google sign in failed, try again'
        });
      });
  });
});
