import GetAllUsersAction from 'GetAllUsersAction';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');
// jest.mock('GetAllUsersAction', () => jest.fn());

describe('getAllUsersAction', () => {
  let PostItDispatcher;

  const groupId = {
    groupId: 'groupId'
  };

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action of type got all users on success', () => {
    GetAllUsersAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.GOT_GROUP_USERS
    });
  });

  it('should dispatch server action to handle fail scenario', () => {
    require('superagent').__setMockError({
      message: 'get all users failed'
    });
    GetAllUsersAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GROUP_USERS
    });
  });
});
