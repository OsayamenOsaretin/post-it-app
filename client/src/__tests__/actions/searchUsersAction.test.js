import { mockAuth, mockDatabase } from 'firebase';
import PostItActionTypes from '../../flux/ActionTypes';
import searchUsers from '../../flux/actions/searchUsersAction';
import Dispatcher from '../../flux/Dispatcher';

/* global jest */

jest.mock('../../flux/Dispatcher');

const testUser1 = {
  id: 'testUser1Id',
  email: 'testUser1Email@email.com',
  username: 'testUser1'
};

const testUser2 = {
  id: 'testUser2Id',
  email: 'testUser2Email@email.com',
  username: 'testUser2'
};

const testUser3 = {
  id: 'testUser3Id',
  email: 'testUser3Email@email.com',
  username: 'thirdTestUser'
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

usersRef.set({
  testUser3Id: testUser3
});

// usersIngroupRef.set({
  // testUser2Id: true
// });

// usersIngroupRef.set({
  // testUser1Id: true
// });

// usersIngroupRef.set({
  // testUser3Id: true
// });

mockDatabase.flush();

describe('searchUsersAction', () => {
  const searchParams = {
    groupId: 'testGroupId',
    search: 'test'
  };

  let dispatcherSpy;
  let searchedUsers;
  beforeEach(() => {
    dispatcherSpy = spyOn(Dispatcher, 'handleServerAction');
    searchedUsers = new Map();
  });

  it('should return users that match the username provided', () => {
    searchedUsers.set('testUser1Id', testUser1);
    searchedUsers.set('testUser2Id', testUser2);
    mockAuth.changeAuthState({
      uid: 'testUser',
      provider: 'custom'
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    searchUsers(searchParams);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.RECEIVE_SEARCHED_USERS,
      users: searchedUsers
    });
  });

  xit('should return all users not in group when no search params provided',
    () => {
      searchedUsers.set('testUser1Id', testUser1);
      searchedUsers.set('testUser2Id', testUser2);
      searchedUsers.set('testUser3Id', testUser3);
      mockDatabase.autoFlush();
      mockAuth.changeAuthState({
        uid: 'testUser',
        provider: 'custom'
      });
      mockAuth.autoFlush();
      searchParams.search = '';
      searchUsers(searchParams);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: PostItActionTypes.RECEIVE_SEARCHED_USERS,
        users: searchedUsers
      });
    });

  it('should not return any data when user is not authenticated', () => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    searchUsers(searchParams);
    expect(dispatcherSpy).toHaveBeenCalledWith({
      type: PostItActionTypes.LOGIN_ERROR
    });
  });
});
