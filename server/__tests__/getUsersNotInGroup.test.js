import io from 'io'; // eslint-disable-line
import { mockDatabase } from 'firebase';
import getUsersNotInGroup from '../controllerFunctions/getUsersNotInGroup';

/* global jest */

jest.mock('io', () => ({
  emit: jest.fn()
}));

const result = {
  send: jest.fn(),
  body: {
    message: ''
  },
  status: (statusCode) => {
    result.status = statusCode;
    return result;
  },
};

const request = {
  body: {
    userId: 'testUserId',
    groupId: 'testGroupId',
  }
};


const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: true
});

describe('GetUsersNotInGroup', () => {
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

  userRef.set({
    signedIn: true
  });

  mockDatabase.flush();
  it('should send users returned message when user is authenticated', () => {
    getUsersNotInGroup(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'Users returned'
    });
  });

  it('should status 401 when authentication fails', () => {
    userRef.set({
      signedIn: false
    });
    getUsersNotInGroup(request, result);
    mockDatabase.flush();
    expect(result.status).toBe(401);
  });
});
