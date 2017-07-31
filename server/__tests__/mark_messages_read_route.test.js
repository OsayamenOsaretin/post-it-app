import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import MarkMessagesRead from '../routes/mark_messages_read_route';

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

MarkMessagesRead(app, mockSdk);

describe('MarkMessagesRead', () => {
  beforeEach(() => {
    mockDatabase = new mockfirebase.MockFirebase();
    mockAuth = new mockfirebase.MockFirebase();
  });

  const testMessages = new Map();
  testMessages.set('testMessage1', 'testMessageBody');
  testMessages.set('testMessage2', {
    message: 'body',
    sender: 'testUser2'
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
      .post('/read')
      .then((result) => {
        expect(result.body.message).toBe('no messages read');
        done();
      });
  });

  it('should return error message when sign in fails', (done) => {
    mockAuth.changeAuthState(undefined);
    mockAuth.autoFlush();
    request(app)
      .post('/read')
      .send({
        messages: []
      })
      .then((result) => {
        // console.log(result);
        expect(result.body.message).toBe('You are not signed in right now!');
        done();
      });
  });

  it('should mark messages when messages are sent', (done) => {
    mockAuth.changeAuthState({
      uid: 'testUid',
      displayName: 'testUser',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/read')
      .send({
        messages: testMessages
      })
      .then((result) => {
        expect(result.body.message).toBe('messages well read');
        done();
      });
  });
});

