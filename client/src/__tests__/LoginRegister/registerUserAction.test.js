import RegisterAction from 'RegisterAction';
import PostItActionTypes from '../data/PostItActionTypes';

jest.mock('superagent');
jest.mock('../data/PostItDispatcher');

describe('registerUserAction', () => {
  let PostItDispatcher;

  beforeEach(() => {
    jest.clearAllMocks();
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch server action on successful sign up', () => {
    RegisterAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });

  it('should dispatch error payload when register user fails', () => {
    require('superagent').__setMockError({
      message: 'Error!!!'
    });
    RegisterAction();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.REGISTER_ERROR
    });
  });
});
