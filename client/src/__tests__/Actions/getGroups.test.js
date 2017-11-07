import { mockAuth, mockDatabase } from 'firebase';
import PostItDispatcher from '../../flux/Dispatcher';
import PostItActionTypes from '../../flux/ActionTypes';
import getGroups from '../../flux/actions/getGroups';
import receiveGroup from '../../flux/actions/receivGroups';
import bulkMessageRequest from '../../utility/bulkMessageRequest';

/* global jest */

jest.mock('../../flux/actions/receivGroups', () => jest.fn());
jest.mock('../../utility/bulkMessageRequest', () => jest.fn());
jest.mock('../../flux/actions/getRequests', () => jest.fn());


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
    groupResult.set('testGroupI', testGroup);
    expect(receiveGroup).toHaveBeenCalledWith(groupResult);
    expect(bulkMessageRequest).toHaveBeenCalledWith(groupResult);
  });

  it('should dispatch error, when authentication fails', () => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    getGroups();
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.LOGIN_ERROR
    });
  });
});
