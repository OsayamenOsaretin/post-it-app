import PostItActionTypes from '../../flux/ActionTypes';
import GroupAction from 'GroupAction'; // eslint-disable-line

/* global jest */

jest.mock('../../flux/Dispatcher');
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
    Action = require('../../flux/actions/groupActions');   // eslint-disable-line
    PostItGroupStore = require('../../flux/stores/GroupStore').default;  // eslint-disable-line
    PostItDispatcher = require('../../flux/Dispatcher').default;  // eslint-disable-line
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

  it('should attach event emitter when add change listener is called', () => {
    const spyOnAddEvent = spyOn(PostItGroupStore, 'on');
    const mockCallBack = jest.fn();
    PostItGroupStore.addChangeListener(mockCallBack);
    expect(spyOnAddEvent).toHaveBeenCalledWith('change', mockCallBack);
  });

  it('should remove event emitter when remove change lister is called', () => {
    const spyOnRemoveEvent = spyOn(PostItGroupStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItGroupStore.removeChangeListener(mockCallBack);
    expect(spyOnRemoveEvent).toHaveBeenCalledWith('change', mockCallBack);
  });
});
