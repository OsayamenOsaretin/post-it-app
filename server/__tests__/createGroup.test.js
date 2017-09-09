import { mockDatabase } from 'firebase';
import createGroup from '../controllerFunctions/createGroup';

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
  body: {
    id: 'testUserId',
    groupName: 'testGroupName'
  }
};

const userRef = mockDatabase.child('/users/testUserId/');
userRef.set({
  signedIn: false
});

describe('CreateGroup', () => {
  it('should send proper response when authentication fails', () => {
    createGroup(request, result);
    mockDatabase.flush();
    expect(result.status).toBe(401);
  });

  it('should send proper response when authentication passes', () => {
    userRef.set({
      signedIn: true
    });
    createGroup(request, result);
    mockDatabase.flush();
    expect(result.send).toHaveBeenCalled();
  });
});
