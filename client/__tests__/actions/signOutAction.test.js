import { mockAuth } from 'firebase';
import SignOutAction from '../../src/actions/signOutAction';
import PostItActionTypes from '../../src/ActionTypes';
import PostItDispatcher from '../../src/Dispatcher';

/* global jest */

jest.mock('firebase');
jest.mock('../../src/Dispatcher');

describe('userSignOutAction', () => {
  it('should dispatch to user store to sign out user', () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.autoFlush();
    expect.assertions(1);
    return SignOutAction()
      .then(() => {
        expect(spyOnDispatcher.calls.count()).toBe(6);
      });
  });

  it('should dispatch error payload when sign out fails', () => {
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    const error = new Error('error');
    mockAuth.failNext('signOut', error);
    return SignOutAction()
      .then(() => {
        expect(spyOnDispatcher).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_SIGN_OUT
        });
      });
  });
});
