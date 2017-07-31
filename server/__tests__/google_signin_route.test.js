import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import GoogleSignIn from '../routes/google_signin_route';

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

GoogleSignIn(app, mockSdk);

describe('GoogleSignIn', () => {
  mockSdk.auth.GoogleAuthProvider.credential = jest.fn();

  beforeEach(() => {
    mockDatabase = new mockfirebase.MockFirebase();
    mockAuth = new mockfirebase.MockFirebase();
  });

  it('should sign in user successfully', (done) => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request(app)
      .post('/user/google/signin')
      .send({
        idToken: 'testToken'
      })
      .then((result) => {
        // console.log(result);
        expect(result.body.message).toBe('user signed in');
        done();
      });
  });

  it('should return error message when sign in fails', (done) => {
    const error = new Error('error');
    mockAuth.failNext('signInWithCredential', error);
    mockAuth.autoFlush();
    request(app)
      .post('/user/google/signin')
      .send({
        idToken: 'testToken'
      })
      .then((result) => {
        // console.log(result);
        expect(result.body.message).toBe('Error signin in: error');
        done();
      });
  });

  // it('should return error message when database update fails', (done) => {
  //   const error = new Error('error');
  //   mockDatabase.child('users').failNext('set', error);
  //   mockAuth.autoFlush();
  //   mockDatabase.autoFlush();
  //   request(app)
  //     .post('/user/google/signin')
  //     .send({
  //       idToken: 'testToken'
  //     })
  //     .then((result) => {
  //       console.log(result);
  //       expect(result.body.message).toBe('error');
  //       done();
  //     });
  // });
});

