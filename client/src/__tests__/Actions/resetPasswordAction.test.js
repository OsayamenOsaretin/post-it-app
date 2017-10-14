import { mockAuth } from 'firebase';
import PostItActionTypes from '../../flux/ActionTypes';
import ResetPasswordAction from '../../flux/actions/resetPasswordAction';
import PostItDispatcher from '../../flux/Dispatcher';

/* global jest */
jest.mock('firebase');
jest.mock('../../flux/Dispatcher');

describe('resetPasswordAction', () => {
  it('should dispatch payload for password reset', () => {
    mockAuth.autoFlush();
    const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    return ResetPasswordAction({ resetEmail: 'testEmail@email.com' })
      .then(() => {
        expect(spyOnDispatcher).toHaveBeenCalledWith({
          type: PostItActionTypes.RESET_MESSAGE_SENT
        });
      });
  });

  it('should dispatch error payload', () => {
    const error = new Error('error');
    mockAuth.failNext('sendPasswordResetEmail', error);
    return ResetPasswordAction({ resetEmail: 'testEmail@email.com' })
      .then(() => {
        expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_RESET_PASSWORD
        });
      });
  });
});
