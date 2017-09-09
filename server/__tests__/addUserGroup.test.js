import { mockDatabase } from 'firebase';
import addUserGroup from '../controllerFunctions/addUserGroup';

/* global jest */

jest.unmock('superagent');

const result = {
  send: jest.fn(),
  body: {
    message: ''
  },
  status: (statusCode) => {
    result.status = statusCode;
    return result;
  },
  editMessageObject: (messageObject) => {
    result.body.message = messageObject;
  }
};

const request = {
  params: {
    groupId: 'testGroupId',
  },
  body: {
    userId: 'testUserId'
  }
};

const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: false
});

describe('AddUserGroup', () => {
  it('should send proper response when authentication fails', () => {
    // const theSpy = spyOn(result, 'send');
    addUserGroup(request, result);
    mockDatabase.flush();
    expect(result.status).toBe(401);
  });

  it('should send proper response when authentication passes', () => {
    userRef.set({
      signedIn: true
    });
    addUserGroup(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalledWith({
      message: 'User sent request'
    });
  });
});

