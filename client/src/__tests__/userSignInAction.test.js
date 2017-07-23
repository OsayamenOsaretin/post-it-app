import SignInAction from 'SignInAction';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('userSignInAction', () => {
  const PostItDispatcher = require('../data/PostItDispatcher');

  it('should dispatch to login after successful sign in ', () => {
    SignInAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });
});
