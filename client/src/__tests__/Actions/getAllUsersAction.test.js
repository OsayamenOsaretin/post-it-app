import GetAllUsersAction from 'GetAllUsersAction';  // eslint-disable-line
import PostItActionTypes from '../../flux/ActionTypes';

/* global jest */

jest.mock('superagent');
jest.mock('../../flux/Dispatcher');

describe('getAllUsersAction', () => {
  let PostItDispatcher;

  const groupId = {
    groupId: 'groupId'
  };

  beforeEach(() => {
    PostItDispatcher = require('../../flux/Dispatcher');  // eslint-disable-line
  });

  it('should dispatch server action of type got all users on success', () => {
    GetAllUsersAction(groupId);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.GOT_GROUP_USERS
    });
  });

  it('should dispatch server action to handle fail scenario', () => {
    require('superagent').__setMockError({   // eslint-disable-line
      message: 'get all users failed'
    });
    GetAllUsersAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GROUP_USERS
    });
  });
});
