import firebase, { mockDatabase } from 'firebase';
import getRequests from '../../src/actions/getRequests';
import receiveRequests from '../../src/actions/receiveRequestAction';

/* global jest */

jest.mock('../../src/actions/receiveRequestAction', () => jest.fn());

describe('GetRequests', () => {
  const database = firebase.database();
  const request = {
    groupName: 'testGroup',
    sender: 'testSender'
  };
  const requestRef = mockDatabase.child('/users/testUserId/requests');
  requestRef.set({
    firstKey: request
  });
  mockDatabase.autoFlush();
  it('should call receive requests with right arguments', () => {
    getRequests('testUserId', database);
    const resultRequest = new Map();
    resultRequest.set('firstKey', request);
    expect(receiveRequests).toHaveBeenCalledWith(resultRequest);
  });
});

