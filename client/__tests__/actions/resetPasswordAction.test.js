import { mockAuth } from 'firebase';
import PostItActionTypes from '../../src/ActionTypes';
import ResetPasswordAction from '../../src/actions/resetPasswordAction';
import PostItDispatcher from '../../src/Dispatcher';

/* global jest */
jest.mock('firebase');
jest.mock('../../src/Dispatcher');

describe('resetPasswordAction', () => {
  it('should dispatch payload of the right type for password reset', () => {
    mockAuth.autoFlush();
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    return ResetPasswordAction({ resetEmail: 'testEmail@email.com' })
      .then(() => {
        expect(spyOnDispatcher).toHaveBeenCalledWith({
          type: PostItActionTypes.RESET_MESSAGE_SENT
        });
      });
  });

  it('should dispatch error payload when reset password action fails', () => {
    const error = new Error('error');
    mockAuth.failNext('sendPasswordResetEmail', error);
    return ResetPasswordAction({ resetEmail: 'testEmail@email.com' })
      .then(() => {
        expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_RESET_PASSWORD,
          message: 'Something went wrong'
        });
      });
  });

  it('should dispatch correct error message when user does not exits', () => {
    const error = new Error('error');
    error.code = 'auth/user-not-found';
    mockAuth.failNext('sendPasswordResetEmail', error);
    return ResetPasswordAction({ resetEmail: 'testEmail@email.com' })
      .then(() => {
        expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_RESET_PASSWORD,
          message: 'Oops! Incorrect email'
        });
      });
  });
});
