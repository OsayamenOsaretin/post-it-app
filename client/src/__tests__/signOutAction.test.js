import SignOutAction from 'SignOutAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('userSignOutAction', () => {
  const PostItDispatcher = require('../data/PostItDispatcher');

  it('should dispatch to user store to sign out user', () => {
    SignOutAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.SIGN_OUT
    });
  });

  it('should dispatch error payload when sign out fails', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    SignOutAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_SIGN_OUT
    });
  });
});
