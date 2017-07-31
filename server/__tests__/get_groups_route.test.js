import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import io from 'socket.io';
import bodyParser from 'body-parser';
import GetGroups from '../routes/get_groups_route';

/* global jest */

jest.unmock('superagent');
jest.mock('socket.io', () => (
  {
    emit: jest.genMockFunction()
  }
));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mockDatabase = new mockfirebase.MockFirebase();
let mockAuth = new mockfirebase.MockFirebase();

// create firebase sdk mock
const mockSdk = mockfirebase.MockFirebaseSdk(path => (
  mockDatabase.child(path)
), () => (
  mockAuth
));

GetGroups(app, mockSdk, io);

describe('GetGroups', () => {
  // const groupId = 'testGroupId';

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
    .child('groups/testGroupId');

  groupReference.set({
    testGroupId: testGroup
  });

  mockDatabase.flush();

  beforeEach(() => {
    mockAuth = new mockfirebase.MockFirebase();
  });

  it('should send error message when authentication fails', (done) => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .get('/groups')
      .expect(403)
      .then((result) => {
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  });

  it('should send result when authentication passes', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .get('/groups')
      .then((result) => {
        expect(result.body.message).toBe('Groups Returned');
        done();
      });
  });
});

