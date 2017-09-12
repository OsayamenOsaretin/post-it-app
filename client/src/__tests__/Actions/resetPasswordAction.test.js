import PostItActionTypes from '../data/PostItActionTypes';
import ResetPasswordAction from 'ResetPasswordAction';

/* global jest */
jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('resetPasswordAction', () => {
  let PostItDispatcher;

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch payload for password reset', () => {
    ResetPasswordAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });

  it('should dispatch error payload', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    ResetPasswordAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_RESET_PASSWORD
    });
  });
});
