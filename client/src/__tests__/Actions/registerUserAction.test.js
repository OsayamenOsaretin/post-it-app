import { mockDatabase, mockAuth } from 'firebase';
import Dispatcher from '../../flux/Dispatcher';
import RegisterAction from 'RegisterAction';    // eslint-disable-line
import PostItActionTypes from '../../flux/ActionTypes';

/* global jest */

jest.mock('../../flux/Dispatcher');

describe('registerUserAction', () => {
  const userDetails = {
    email: 'testEmail@email.com',
    password: 'testPassword',
    confirmPassword: 'testPassword',
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
          type: PostItActionTypes.REGISTER_ERROR,
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
            type: PostItActionTypes.REGISTER_ERROR,
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
      userDetails.confirmPassword = 'bad';
      return RegisterAction(userDetails)
        .then(() => {
          expect(dispatcherSpy).toHaveBeenCalledWith({
            type: PostItActionTypes.REGISTER_ERROR,
            errorMessage:
            'Invalid password, please use a password longer than 6 characters' //eslint-disable-line
          });
        });
    });

  it('should dispatch error payload when passwords do not match', () => {
    const dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    userDetails.email = 'testEmail@email.com';
    userDetails.userName = 'testUsername';
    userDetails.password = 'this says this';
    userDetails.confirmPassword = 'this says that';
    return RegisterAction(userDetails)
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.REGISTER_ERROR,
          errorMessage:
          'Passwords do not match!'
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
    userDetails.confirmPassword = 'longenoughpassword';
    return RegisterAction(userDetails)
      .then(() => {
        expect(dispatcherSpy).toHaveBeenCalledWith({
          type: PostItActionTypes.LOGIN_USER,
          user: expect.anything()
        });
      });
  });
});
