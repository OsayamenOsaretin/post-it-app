import GetAllUsersAction from 'GetAllUsersAction';

/* global jest */

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');
jest.mock('GetAllUsersAction', () => jest.fn());

describe('getAllUsersAction', () => {
  // let PostItDispatcher;

  const groupId = {
    groupId: 'groupId'
  };

  beforeEach(() => {
    // PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action to all user store on success', () => {
    GetAllUsersAction(groupId);
    expect(GetAllUsersAction).toHaveBeenCalledWith(groupId);
  });
});
