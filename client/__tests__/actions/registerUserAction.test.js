import { mockDatabase, mockAuth } from 'firebase';
import Dispatcher from '../../src/Dispatcher';
import RegisterAction from 'RegisterAction';    // eslint-disable-line
import PostItActionTypes from '../../src/ActionTypes';

/* global jest */

jest.mock('../../src/Dispatcher');

describe('registerUserAction', () => {
  const userDetails = {
    email: 'testEmail@email.com',
    password: 'testPassword',
    userName: 'testUsername',
    phone: 'somephonenumber'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch error payload when email is invalid',
    () => {
      const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
      mockAuth.autoFlush();
      mockDatabase.autoFlush();
      userDetails.email = 'badEmail';
      RegisterAction(userDetails).then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.FAILED_REGISTER,
          errorMessage: 'Invalid email, please enter your actual email'
        });
      });
    });

  it('should dispatch error payload when username is invalid',
    () => {
      const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
      mockAuth.autoFlush();
      mockDatabase.autoFlush();
      userDetails.email = 'testEmail@email.com';
      userDetails.userName = '';
      return RegisterAction(userDetails)
        .then(() => {
          expect(dispatcherSpy).toHaveBeenCalledWith({
            type: PostItActionTypes.FAILED_REGISTER,
            errorMessage: 'Invalid Username, please enter a valid username'
          });
        });
    });

  it('should dispatch error payload when password is invalid',
    () => {
      const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
      mockAuth.autoFlush();
      mockDatabase.autoFlush();
      userDetails.email = 'testEmail@email.com';
      userDetails.userName = 'testUsername';
      userDetails.password = 'bad';
      return RegisterAction(userDetails)
        .then(() => {
          expect(dispatcherSpy).toHaveBeenCalledWith({
            type: PostItActionTypes.FAILED_REGISTER,
            errorMessage:
                'Invalid password, please use a password longer than 6 characters'   // eslint-disable-line
          });
        });
    });

  it('should dispatch server action to sign in on successful sign up', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    userDetails.email = 'testEmail@email.com';
    userDetails.userName = 'testUsername';
    userDetails.password = 'longenoughpassword';
    return RegisterAction(userDetails)
      .then(() => {
        const spyCallArgs = dispatcherSpy.calls.mostRecent().args[0];
        const actionType = spyCallArgs.type;
        const actionUser = spyCallArgs.user;
        const userEmail = actionUser.email;
        expect(userEmail).toBe('testEmail@email.com');
        expect(actionType).toBe(PostItActionTypes.LOGIN_USER);
      });
  });
});