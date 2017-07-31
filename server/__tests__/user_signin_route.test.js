import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import SignIn from '../routes/user_signin_route';

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

describe('SignIn', () => {
  it('should send correct response when invalid email is recieved', (done) => {
    SignIn(app, mockSdk);
    request(app)
      .post('/user/signin')
      .send({
        email: 'testUser1email',
        password: 'testPassword'
      })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe('Something went wrong, Please use a valid email address');
        done();
      });
  });

  it('should send correct response when authentication fails', (done) => {
    SignIn(app, mockSdk);
    const error = new Error('error!');
    mockAuth.failNext('signInWithEmailAndPassword', error);
    mockAuth.autoFlush();
    request(app)
      .post('/user/signin')
      .send({
        email: 'testUser1email@email.com',
        password: 'testPassword'
      })
      .expect(401)
      .then((result) => {
        expect(result.body.message)
          .toBe('Ouch!, Your username or password is incorrect, please try again');
        done();
      });
  });

  it('should send appropriate response when password field is empty', (done) => {
    SignIn(app, mockSdk);
    request(app)
      .post('/user/signin')
      .send({
        email: 'testUser1email@email.com',
        password: ''
      })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe('Please fill in your password');
        done();
      });
  });

  it('should succeed when all fields are entered correctly', (done) => {
    SignIn(app, mockSdk);
    mockAuth.autoFlush();
    request(app)
      .post('/user/signin')
      .send({
        email: 'testUser1emai@email.com',
        password: 'testPassword'
      })
      .expect(200)
      .then((result) => {
        expect(result.body.message).toBe('Welcome User, or Ranger.');
        done();
      });
  });
});
