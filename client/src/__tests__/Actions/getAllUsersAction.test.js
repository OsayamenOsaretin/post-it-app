import { mockDatabase, mockAuth } from 'firebase';
import PostItActionTypes from '../../flux/ActionTypes';
import getAllUsers from '../../flux/actions/getAllUsersAction';
import Dispatcher from '../../flux/Dispatcher';

/* global jest */

jest.mock('../../flux/Dispatcher');
jest.mock('firebase');

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

  // populate database
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
    groupId: 'groupId'
  };

  it('should dispatch server action of type got all users on success', () => {
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
      id: 'groupId',
      type: PostItActionTypes.RECIEVE_USERS,
      users: usersNotInGroup
    });
  });

  it('should dispatch server action to handle fail scenario', () => {
    mockAuth.changeAuthState(undefined);
    getAllUsers(groupId);
    expect(Dispatcher.handleServerAction).toHaveBeenCalledWith({
      type: PostItActionTypes.FAILED_GROUP_USERS
    });
  });
});
