import PostItActionTypes from '../../flux/ActionTypes';
import userList from '../../flux/models/groupList';
import GetAllUsersAction from 'GetAllUsersAction';    // eslint-disable-line

/* global jest */

jest.mock('../../flux/Dispatcher');
jest.mock('GetAllUsersAction', () => jest.fn());
jest.unmock('immutable-sorted');


describe('PostItAllUsersStore ', () => {
  const userMap = new Map();
  userMap.set('testUser', {});

  const users = new userList(userMap);
  const newUserMap = new Map();
  newUserMap.set('testUser2', {});
  newUserMap.set('testUser3', {});

  const newUsers = new userList(newUserMap);

  const getUsers = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.GET_USERS
    }
  };

  const recieveUsers = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.RECIEVE_USERS,
      users,
      id: 'testGroupId'
    }
  };

  const recieveNewUsers = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.RECIEVE_USERS,
      users: newUsers,
      id: 'testGroupId'
    }
  };

  const clearUsers = {
    source: 'SERVER_ACTION',
    action: {
      type: PostItActionTypes.CLEAR_USERS_STORE
    }
  };

  const defaultAction = {
    source: 'SERVER_ACTION',
    action: {
      type: 'DEFAULT_ACTION'
    }
  };

  let callback;
  let PostItDispatcher;
  let PostItAllUsersStore;
  let Action;

  beforeEach(() => {
    jest.resetModules();
    Action = require('../../flux/actions/getAllUsersAction'); // eslint-disable-line
    PostItAllUsersStore = require('../../flux/stores/AllUsersStore').default; // eslint-disable-line
    PostItDispatcher = require('../../flux/Dispatcher').default;    // eslint-disable-line
    callback = PostItDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', () => {
    expect(PostItDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with empty users list', () => {
    expect((PostItAllUsersStore.getUsers('testGroupId'))).not.toBeDefined();
  });

  it('should update user list after getting new values', () => {
    callback(recieveUsers);
    expect((PostItAllUsersStore.getUsers('testGroupId')).size).toBe(1);
  });

  it('should merge a new list with former list when user list updates',
    () => {
      callback(recieveUsers);
      callback(recieveNewUsers);
      expect((PostItAllUsersStore.getUsers('testGroupId')).size).toBe(3);
    });

  it('should clear user list when clear store action is called ', () => {
    callback(recieveUsers);
    expect((PostItAllUsersStore.getUsers('testGroupId')).size).toBe(1);
    callback(clearUsers);
    expect(PostItAllUsersStore.getUsers('testGroupId')).not.toBeDefined();
  });

  it('should delete user when delete user action is received', () => {
    const deleteUserAction = {
      action: {
        type: PostItActionTypes.DELETE_USER,
        id: 'testUser',
        groupId: 'testGroupId',
      }
    };
    const getUser = () => (
      PostItAllUsersStore.getUsers('testGroupId').get('testUser')
    );
    callback(recieveUsers);
    expect(getUser()).toBeDefined();
    callback(deleteUserAction);
    expect(getUser()).not.toBeDefined();
  });

  it('should call get all users action on recieving dispatch', () => {
    callback(getUsers);
    expect(Action.mock.calls.length).toBe(1);
  });

  it('should have function to add event listener', () => {
    const spyOnEventListener = spyOn(PostItAllUsersStore, 'on');
    const mockCallBack = jest.fn();
    PostItAllUsersStore.addChangeListener(mockCallBack, 'testChange');
    expect(spyOnEventListener).toHaveBeenCalledWith('testChange', mockCallBack);
  });

  it('should plainly return true in case of action types not handled', () => {
    const returnValue = callback(defaultAction);
    expect(returnValue).toBe(true);
  });

  it('should have function to remove event listener', () => {
    const spyOnEventListener = spyOn(PostItAllUsersStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItAllUsersStore.removeChangeListener(mockCallBack, 'testChange');
    expect(spyOnEventListener).toHaveBeenCalledWith('testChange', mockCallBack);
  });
});
