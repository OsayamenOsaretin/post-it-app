import { mockDatabase, mockAuth } from 'firebase';
import { recieveGroups,
  addGroup,
  getGroups,
  addGroupApi } from
  '../../flux/actions/groupActions';
import PostItActionTypes from '../../flux/ActionTypes';
import PostItDispatcher from '../../flux/Dispatcher';

/* global jest */

jest.mock('firebase');
jest.mock('../../flux/Dispatcher');
jest.setMock('../../flux/actions/groupActions', () => jest.fn());

describe('groupActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
  });

  it('should dispatch to stores with right arguments on add group', () => {
    addGroup('test group name');
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.ADD_GROUP,
      groupName: 'test group name'
    });
  });

  it('should dispatch to stores with right arguments on recieve groups', () => {
    recieveGroups('test result');
    expect(dispatcherSpy).toHaveBeenLastCalledWith({
      type: PostItActionTypes.RECIEVE_GROUP_RESPONSE,
      userGroups: 'test result'
    });
  });

  it('should call recieve group function after successful group api call',
    () => {
      mockAuth.changeAuthState({
        uid: 'testUid',
        provider: 'custom',
        token: 'authToken',
      });
      mockAuth.autoFlush();
      mockDatabase.autoFlush();
      addGroupApi({ groupName: 'testName' });
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: PostItActionTypes.ADD_GROUP
      });
    });

  it('should dispatch failed to add group payload when user is not authenticated' // eslint-disable-line
    , () => {
      mockAuth.changeAuthState(undefined);
      mockAuth.autoFlush();
      addGroupApi({ groupName: 'testName' });
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: PostItActionTypes.FAILED_ADD_GROUP
      });
    });

  it('should dispatch getting groups payload when get groups succeeds', () => {
    // const spyOnDispatcher = spyOn(PostItDispatcher, 'handleServerAction');
    const testGroup = {
      groupName: 'testGroupName',
      groupUsers: []
    };

    const groupsReference = mockDatabase
      .child('users/testUserId/groups/');

    groupsReference.set({
      testGroupId: true
    });

    const groupReference = mockDatabase
      .child('/groups/testGroupId');

    groupReference.set({
      testGroupId: testGroup
    });

    // mockDatabase.flush();
    mockAuth.changeAuthState({
      uid: 'testUserId',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    getGroups();
    expect(dispatcherSpy).toHaveBeenCalled();
  });
});
