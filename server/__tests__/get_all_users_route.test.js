import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import io from 'socket.io';
import bodyParser from 'body-parser';
import GetAllUsers from '../routes/get_all_users_route';

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

// MockFirebase.override();
GetAllUsers(app, mockSdk, io);
describe('GetAllUsers', () => {
  const groupId = {
    groupId: 'testGroupId'
  };

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

  beforeEach(() => {
    // mockDatabase = new mockfirebase.MockFirebase();
    mockAuth = new mockfirebase.MockFirebase();
  });

  it('should send appropriate response when authentication fails', (done) => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/users')
      .send(groupId)
      .expect(403)
      .then((result) => {
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  });

  it('should call socket.io emit when authentication passes', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/users')
      .send(groupId)
      .then((result) => {
        expect(result.body.message).toBe('Users returned');
        done();
      });
  });
});

