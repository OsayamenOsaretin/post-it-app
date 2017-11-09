import { mockAuth } from 'firebase';
import SignInAction from '../../flux/actions/userSignInAction';
import PostItActionTypes from '../../flux/ActionTypes';
import PostItDispatcher from '../../flux/Dispatcher';

/* global jest */

jest.mock('firebase');
jest.mock('../../flux/Dispatcher');

describe('userSignInAction', () => {
  it('should dispatch to login after successful sign in ', () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    mockAuth.autoFlush();
    return SignInAction({
      email: 'theemail@email.com',
      password: 'thepassword' })
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.LOGIN_USER,
          user: expect.anything()
        });
      });
  });

  it('should dispatch error payload when sign in fails', () => {
    const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
    const error = new Error('error');
    mockAuth.autoFlush();
    mockAuth.failNext('signInWithEmailAndPassword', error);
    return SignInAction({
      email: 'theemail@email.com',
      password: 'thepassword' })
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.LOGIN_ERROR,
          errorMessage:
            'Something went wrong, please try again'
        });
      });
  });

  it('should dispatch invalid email address message when email string is invalid',  // eslint-disable-line
    () => {
      const dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
      mockAuth.autoFlush();
      return SignInAction({
        email: 'bademailstring',
        password: 'thepassword' }
      ).then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.LOGIN_ERROR,
          errorMessage: 'Invalid email address'
        });
      });
    });
});
