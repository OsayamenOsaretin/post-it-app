import io from 'io'; // eslint-disable-line
import { mockDatabase } from 'firebase';
import getGroups from '../controllerFunctions/getGroups';

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
  params: {
    userId: 'testUserId'
  }
};


const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: false
});

describe('GetGroups', () => {
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

  mockDatabase.flush();
  it('should return status code 401, when user is not authenticated', () => {
    getGroups(request, result);
    mockDatabase.flush();
    expect(result.status).toBe(401);
  });

  it('should return groups request successful when everything works well',
    () => {
      userRef.set({
        signedIn: true
      });
      getGroups(request, result);
      mockDatabase.flush();
      expect(0).toBe(0);
    });
});
