import superagent from 'superagent';
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
});
