import { mockAuth, mockDatabase } from 'firebase';
import PostItActionTypes from '../../../src/ActionTypes';
import PostItDispatcher from '../../../src/Dispatcher';
import AddUserGroup from '../../../src/actions/addUserGroup';
/* global jest */

jest.mock('firebase');
jest.mock('../../../src/Dispatcher');

describe('addUserGroup', () => {
  const Details = {
    userId: 'testUserId',
    groupId: 'testGroupId'
  };

  it('should dispatch to delete user for group\'s user list', () => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken'
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    AddUserGroup(Details);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.DELETE_USER,
      id: Details.userId,
      groupId: Details.groupId
    });
  });

  it('should dispatch with error payload when add user to group fails', () => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    AddUserGroup(Details);
    expect(PostItDispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_ADD_USER
    });
  });
});
