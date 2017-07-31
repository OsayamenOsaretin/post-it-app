import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import ResetPassword from '../routes/reset_password_route';

/* global jest */

jest.unmock('superagent');

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

ResetPassword(app, mockSdk);

describe('ResetPassword', () => {
  beforeEach(() => {
    mockAuth = new mockfirebase.MockFirebase();
  });
  it('should error message when reset password fails', (done) => {
    const error = new Error('error!');
    mockAuth.failNext('sendPasswordResetEmail', error);
    mockAuth.autoFlush();
    request(app)
      .post('/user/reset-password')
      .send({
        email: 'testemail'
      })
      .then((result) => {
        expect(result.body.message).toBe('Error resetting password: error!');
        done();
      });
  });

  it('should send appropriate response when password reset mail sent', (done) => {
    mockAuth.autoFlush();
    request(app)
      .post('/user/reset-password')
      .send({
        email: 'testemail'
      })
      .then((result) => {
        expect(result.body.message).toBe('reset email sent!');
        done();
      });
  });
});

