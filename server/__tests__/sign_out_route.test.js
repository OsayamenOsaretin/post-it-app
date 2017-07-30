import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import SignOut from '../routes/sign_out_route';

/* global jest */

jest.unmock('superagent');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mockDatabase = new mockfirebase.MockFirebase();
const mockAuth = new mockfirebase.MockFirebase();

// create firebase sdk mock
const mockSdk = mockfirebase.MockFirebaseSdk(path => (
  mockDatabase.child(path)
), () => (
  mockAuth
));

describe('SignOut', () => {
  beforeEach(() => {
    SignOut(app, mockSdk);
  });

  it('should return correct status when sign out fails', (done) => {
    const error = new Error({
      message: 'fail'
    });
    mockAuth.autoFlush();
    mockAuth.failNext('signOut', error);
    request(app)
      .get('/signout')
      .then((result) => {
        expect(result.status).toBe(405);
        done();
      });
  });

  it('should send correct message when user signs out', (done) => {
    mockAuth.autoFlush();
    request(app)
      .get('/signout')
      .then((result) => {
        expect(result.body.message).toBe('You are successfully signed out');
        done();
      });
  });
});
