import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import CreateGroup from '../routes/create_group_routes';

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

CreateGroup(app, mockSdk);

describe('CreateGroup', () => {
  beforeEach(() => {
    mockDatabase = new mockfirebase.MockFirebase();
    mockAuth = new mockfirebase.MockFirebase();
  });

  it('should send error message when authentication fails', (done) => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group')
      .send({
        groupName: 'testGroupName'
      })
      .expect(403)
      .then((result) => {
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  });

  it('should send group created message when authentication passes', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group')
      .send({
        groupName: 'testGroupName'
      })
      .then((result) => {
        expect(result.body.message).toBe('Created Group');
        done();
      });
  });
});
