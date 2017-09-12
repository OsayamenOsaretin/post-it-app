import SignInAction from 'SignInAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('userSignInAction', () => {
  const PostItDispatcher = require('../data/PostItDispatcher');

  it('should dispatch to login after successful sign in ', () => {
    SignInAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });

  it('should dispatch error payload when sign in fails', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    SignInAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.LOGIN_ERROR
    });
  });
});
