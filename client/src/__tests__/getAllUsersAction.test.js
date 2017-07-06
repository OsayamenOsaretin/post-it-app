import GetAllUsersAction from 'GetAllUsersAction';

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('getAllUsersAction', () => {
  let PostItDispatcher;

  beforeEach(() => {
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action to all user store on success', () => {
    GetAllUsersAction();
    expect(PostItDispatcher.handleServerAction.mock.calls.length).toBe(1);
  });
});
