import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import io from 'socket.io';
import bodyParser from 'body-parser';
import GetMessages from '../routes/get_messages_route';

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

GetMessages(app, mockSdk, io);
describe('GetMessages', () => {
  const testMessage = {
    message: 'This is test message 1',
    sender: 'testUser'
  };

  const messagesRef = mockDatabase.child('/messages/testMessage1');
  const groupMessagesRef = mockDatabase
    .child('/groups/testGroupId/messages');

  // populate database
  messagesRef.set({
    testMessage1: testMessage
  });

  groupMessagesRef.set({
    testMessage1: true
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
      .post('/group/messages')
      .send({
        groupId: 'testGroupId'
      })
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
      .post('/group/messages')
      .send({
        groupId: 'testGroupId'
      })
      .then((result) => {
        expect(result.body.message).toBe('messages retrieved');
        done();
      });
  });

  it('should return the correct notification value', (done) => {
    testMessage.read = {
      testUser: true
    };
    messagesRef.set({
      testMessage1: testMessage
    });
    mockAuth.changeAuthState({
      uid: 'testUid',
      displayName: 'testUser',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group/messages')
      .send({
        groupId: 'testGroupId'
      })
      .then(() => {
        const groupMessageMap = new Map();
        groupMessageMap.set('testMessage1', testMessage);
        expect(io.emit).toHaveBeenLastCalledWith('newMessage', {
          notify: true,
          Id: 'testGroupId',
          groupMessages: groupMessageMap
        });
        done();
      });
  });

  it('should return the correct notification value', (done) => {
    testMessage.read = {
      testUser: true
    };
    messagesRef.set({
      testMessage1: testMessage
    });
    mockAuth.changeAuthState({
      uid: 'testUid',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group/messages')
      .send({
        groupId: 'testGroupId'
      })
      .then(() => {
        const groupMessageMap = new Map();
        groupMessageMap.set('testMessage1', testMessage);
        expect(io.emit).toHaveBeenLastCalledWith('newMessage', {
          notify: false,
          Id: 'testGroupId',
          groupMessages: groupMessageMap
        });
        done();
      });
  });

  it('should return the correct notification value', (done) => {
    messagesRef.child('read').set({
      testUser: true
    });

    mockAuth.changeAuthState({
      uid: 'testUid',
      displayName: 'testUser1',
      provider: 'custom',
      token: 'authToken',
    });
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/group/messages')
      .send({
        groupId: 'testGroupId'
      })
      .then(() => {
        const groupMessageMap = new Map();
        groupMessageMap.set('testMessage1', testMessage);
        expect(io.emit).toHaveBeenLastCalledWith('newMessage', {
          notify: true,
          Id: 'testGroupId',
          groupMessages: groupMessageMap
        });
        done();
      });
  });
});

