import request from 'supertest';
import mockfirebase from 'firebase-mock';
import express from 'express';
import bodyParser from 'body-parser';
import SignUp from '../routes/user_signup_route';

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

describe('SignUp', () => {
  it('should send correct response when user enters invalid email address', (done) => {
    SignUp(app, mockSdk);
    request(app)
      .post('/user/signup')
      .send({
        userName: 'testUser',
        email: 'testUser1email',
        password: 'testPassword'
      })
      .expect(400)
      .then((result) => {
        expect(result.body.message).toBe('Something went wrong, Please use a valid email address');
        done();
      });
  });

  it('should fail when request has missing field', (done) => {
    SignUp(app, mockSdk);
    request(app)
      .post('/user/signup')
      .send({
        userName: '',
        email: 'testUser1email@email.com',
        password: 'testPassword'
      })
      .expect(422)
      .then((result) => {
        expect(result.body.message).toBe('Please make sure you enter all data');
        done();
      });
  });

  it('should succeed when all fields are entered correctly', (done) => {
    mockAuth.autoFlush();
    SignUp(app, mockSdk);
    request(app)
      .post('/user/signup')
      .send({
        userName: 'testUser1',
        email: 'testUser1emai@email.com',
        password: 'testPassword'
      })
      .expect(200)
      .then((result) => {
        expect(result.body.message).toBe('Welcome to the Post It, An email has been sent to you');
        done();
      });
  });
});
