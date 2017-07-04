import PostItActionTypes from '../data/PostItActionTypes';
import GroupAction from 'GroupAction';

jest.mock('../data/PostItDispatcher');
jest.mock('GroupAction', () => jest.fn());

describe('PostItGroupStore', () => {
  const getGroups = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.GET_GROUPS
    }
  };

  const recieveGroups = {
    action: {
      type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
      userGroups: [['testGroup', 'Group']]
    }
  };

  const addGroup = {
    action: {
      type: PostItActionTypes.ADD_GROUP,
      groupName: 'Test Group Name'
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItGroupStore;
  let Action;

  beforeEach(() => {
    jest.resetModules();
    Action = require('../data/postItActions/groupActions');
    PostItGroupStore = require('../data/postItStores/PostItGroupStore');
    PostItDispatcher = require('../data/PostItDispatcher');
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with an empty group map', () => {
    expect((PostItGroupStore.getGroups()).size).toBe(0);
  });

  it('should update group map after recieving dispatch', () => {
    callback(recieveGroups);
    expect((PostItGroupStore.getGroups()).size).toBe(1);
  });

  it('should call add group action on recieving dispatch', () => {
    Action.addGroupApi = jest.fn();
    callback(addGroup);
    expect(Action.addGroupApi.mock.calls.length).toBe(1);
  });

  it('should call get group action on recieve dispatch', () => {
    Action.getGroups = jest.fn();
    callback(getGroups);
    expect(Action.getGroups.mock.calls.length).toBe(1);
  });
});
