import GoogleSignInAction from 'GoogleSignInAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('googleSignInAction', () => {
  let PostItDispatcher;
  const IdToken = {
    id: 'testId'
  };

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch payload to user store on successful sign in', () => {
    GoogleSignInAction(IdToken);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.LOGIN_USER,
      user: {
        username: 'testUser'
      }
    });
  });
});
