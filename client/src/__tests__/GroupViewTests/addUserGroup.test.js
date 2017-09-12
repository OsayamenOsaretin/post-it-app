import AddUserGroup from 'AddUserGroup';
import PostItActionTypes from '../data/PostItActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('addUserGroup', () => {
  const Details = {
    userId: 'testUserId',
    groupId: 'testGroupId'
  };

  let PostItDispatcher;

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch to delete user for group\'s user list', () => {
    AddUserGroup(Details);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.DELETE_USER,
      id: Details.userId,
      groupId: Details.groupId
    });
  });

  it('should dispatch with error payload when add user to group fails', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    AddUserGroup(Details);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_ADD_USER
    });
  });
});
