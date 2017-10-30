import PostItActionTypes from '../../flux/ActionTypes';
import GetAllUsersAction from 'GetAllUsersAction';    // eslint-disable-line

/* global jest */

jest.mock('../../flux/Dispatcher');
jest.mock('GetAllUsersAction', () => jest.fn());


describe('PostItAllUsersStore ', () => {
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
      users: [['testUser', 'Tester']],
      id: 'testGroupId'
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

  it('should have function to remove event listener', () => {
    const spyOnEventListener = spyOn(PostItAllUsersStore, 'removeListener');
    const mockCallBack = jest.fn();
    PostItAllUsersStore.removeChangeListener(mockCallBack, 'testChange');
    expect(spyOnEventListener).toHaveBeenCalledWith('testChange', mockCallBack);
  });
});
