import { recieveGroups, addGroup, getGroups, addGroupApi } from 'GroupActions';
import PostItActionTypes from '../data/PostItActionTypes';


jest.mock('superagent');
jest.mock('../data/PostItDispatcher');


describe('groupActions', () => {
  let PostItDispatcher;

  beforeEach(() => {
    jest.clearAllMocks();
    PostItDispatcher = require('../data/PostItDispatcher');
  });

  it('should dispatch to stores with right arguments on add group', () => {
    addGroup('test group name');
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.ADD_GROUP,
      groupName: 'test group name'
    });
  });

  it('should dispatch to stores with right arguments on recieve groups', () => {
    recieveGroups('test result');
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
      userGroups: 'test result'
    });
  });

  it('should dispatch to store with right arguments after successful add group api call', () =>{
    addGroupApi('testName');
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.GET_GROUPS
    });
  });

  it('should dispatch to store when get group query fails', () => {
    require('superagent').__setMockError({
      message: 'Fetching groups threw error'
    });
    getGroups();
    expect(PostItDispatcher.handleViewAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GROUPS,
      error: 'Fetching groups threw error'
    });
  });

  it('should call recieve group action when get group query succeeds', () => {
    require('superagent').__setMockError(undefined);
    getGroups();
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalled();
  });
});
