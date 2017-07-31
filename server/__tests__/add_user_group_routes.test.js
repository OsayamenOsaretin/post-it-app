import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import AddUserGroup from '../routes/add_user_group_routes';

/* global jest */

jest.unmock('superagent');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let mockDatabase = new mockfirebase.MockFirebase();
let mockAuth = new mockfirebase.MockFirebase();

// create firebase sdk mock
const mockSdk = mockfirebase.MockFirebaseSdk(path => (
  mockDatabase.child(path)
), () => (
  mockAuth
));

AddUserGroup(app, mockSdk);

describe('AddUserToGroup', () => {
  beforeEach(() => {
    mockAuth = new mockfirebase.MockFirebase();
    mockDatabase = new mockfirebase.MockFirebase();
  });
  it('should return the right message when add user to group fails', (done) => {
    // AddUserGroup(app, mockSdk);
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group/testGroupId/user')
      .send({
        userId: 'testUserId'
      })
      .then((result) => {
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  });

  it('should send correct response when user is successfully added', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    console.log(JSON.stringify(mockAuth.changeAuthState));
    request(app)
      .post('/group/testGroupId/user')
      .send({
        userId: 'testUserId'
      })
      .expect(200)
      .then((result) => {
        expect(result.body.message).toBe('User added to group');
        done();
      });
  });
});
