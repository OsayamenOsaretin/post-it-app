import { mockAuth, mockDatabase } from 'firebase';
import PostItDispatcher from '../../src/Dispatcher';
import PostItActionTypes from '../../src/ActionTypes';
import getGroups from '../../src/actions/getGroups';
import receiveGroup from '../../src/actions/receivGroups';
import bulkMessageRequest from '../../src/utility/bulkMessageRequest';

/* global jest */

jest.mock('../../src/actions/receivGroups', () => jest.fn());
jest.mock('../../src/utility/bulkMessageRequest', () => jest.fn());
jest.mock('../../src/actions/getRequests', () => jest.fn());


describe('GetGroups', () => {
  let dispatcherSpy;

  beforeEach(() => {
    dispatcherSpy = spyOn(PostItDispatcher, 'handleServerAction');
  });

  it('should dispatch getting groups payload when get groups succeeds', () => {
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
    const groupResult = new Map();
    groupResult.set('testGroupId', testGroup);
    expect(receiveGroup).toHaveBeenCalledWith(groupResult);
    expect(bulkMessageRequest).toHaveBeenCalledWith(groupResult);
  });

  it('should dispatch no groups payload when no groups exist', () => {
    mockAuth.changeAuthState({
      uid: 'anotherTestUser',
      provider: 'custom',
      token: 'authToken'
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    getGroups();
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.NO_GROUPS
    });
  });

  it('should dispatch login error, when authentication fails', () => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    getGroups();
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_LOGIN
    });
  });
});
