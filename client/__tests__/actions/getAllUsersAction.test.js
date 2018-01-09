import { mockDatabase, mockAuth } from 'firebase';
import PostItActionTypes from '../../src/ActionTypes';
import getAllUsers from '../../src/actions/getAllUsersAction';
import Dispatcher from '../../src/Dispatcher';

/* global jest */

jest.mock('../../src/Dispatcher');

const testUser1 = {
  id: 'testUser1Id',
  email: 'testUser1Email@email.com'
};

const testUser2 = {
  id: 'testUser2Id',
  email: 'testUser2Email@email.com'
};

const usersRef = mockDatabase.child('/users/');
const usersIngroupRef = mockDatabase
  .child('/groups/testGroupId/users');

usersRef.set({
  testUser1Id: testUser1
});
usersRef.set({
  testUser2Id: testUser2
});

usersIngroupRef.set({
  testUser2: true
});

mockDatabase.flush();

describe('getAllUsersAction', () => {
  const groupId = {
    groupId: 'testGroupId'
  };

  it('should dispatch server action of type receive users on success', () => {
    const serverActionSpy = spyOn(Dispatcher, 'handleServerAction');
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    const usersNotInGroup = new Map();
    usersNotInGroup.set('testUser2Id', testUser2);
    getAllUsers(groupId);
    expect(serverActionSpy).toHaveBeenLastCalledWith({
      id: 'testGroupId',
      type: PostItActionTypes.RECIEVE_USERS,
      users: usersNotInGroup
    });
  });

  it('should dispatch action with error payload when authentication fails',
    () => {
      mockAuth.changeAuthState(undefined);
      getAllUsers(groupId);
      expect(Dispatcher.handleServerAction).toHaveBeenCalledWith({
        type: PostItActionTypes.FAILED_GROUP_USERS
      });
    });
});
