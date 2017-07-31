import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import SendMessage from '../routes/send_message_route';

/* global jest */

jest.unmock('superagent');
jest.mock('../utilities/get_users_emails_numbers', () => jest.fn());
jest.mock('../utilities/send_notifications.js', () => jest.fn());

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

SendMessage(app, mockSdk);

describe('SendMessage', () => {
  beforeEach(() => {
    mockDatabase = new mockfirebase.MockFirebase();
    mockAuth = new mockfirebase.MockFirebase();
  });

  it('should mark no messages when none are sent', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/message')
      .send({
        message: 'test message',
        groupId: 'testGroupId',
        sender: 'testSender',
        priorityLevel: 'normal'
      })
      .then((result) => {
        expect(result.body.message).toBe('Message Sent');
        done();
      });
  });

  it('should send error response when authentication fails', (done) => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/message')
      .send({
        message: 'test message',
        groupId: 'testGroupId',
        sender: 'testSender',
        priorityLevel: 'normal'
      })
      .then((result) => {
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  })
});
