import SignInAction from 'SignInAction';

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('userSignInAction', () => {
  let PostItDispatcher = require('../data/PostItDispatcher');

  it('should dispatch to login after successful sign in ', () => {
    SignInAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });
});
