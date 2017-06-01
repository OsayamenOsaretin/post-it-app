import supertest from 'supertest';
import should from 'should';
import sinon from 'sinon';
import mocha from 'mocha';
import { expect } from 'chai';
import assert from 'assert';
import firebase from 'firebase';
// import { firebase } from '../firebase';

/* global before */
/* global beforeEach */

const server = supertest.agent('http://localhost:6969');

describe('Sign up route function', () => {
  let signUpStub;

  before(() => {
    // configure firebase
    const config = {
      apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
      authDomain: 'post-it-69a9a.firebaseapp.com',
      databaseURL: 'https://post-it-69a9a.firebaseio.com',
      projectId: 'post-it-69a9a',
      storageBucket: 'post-it-69a9a.appspot.com',
      messagingSenderId: '383450311400',
    };
    firebase.initializeApp(config);
    signUpStub = sinon.stub(firebase.auth(), 'createUserWithEmailAndPassword');
  });

  afterEach(() => {
    signUpStub.restore();
  });

  it('should sign up user with valid email and password', (done) => {
    server
    .post('/user/signup')
    .send({ userName: 'testUser', email: 'anothertestuser@gmail.com', password: 'validpassword' })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });

  it('should return 400 error status in case of invalid email string', (done) => {
    server
    .post('/user/signup')
    .send({ userName: 'testUser', email: 'invalidemailstring', password: 'thePassword' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      res.body.message.should.equal('Please use a valid email address');
      done();
    });
  });

  it('should fail to sign up user with invalid password', (done) => {
    server
    .post('/user/signup')
    .send({ userName: 'testUser', email: 'testuser@gmail.com', password: '' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});

describe('Sign in route', () => {
  let signInStub;

  beforeEach(() => {
    // configure firebase
    signInStub = sinon.stub(firebase.auth(), 'signInWithEmailAndPassword');

    // signInStub = sinon.stub(global, 'Firebase');
  });

  afterEach(() => {
    signInStub.restore();
  });

  it('should sign in user with valid email and password', (done) => {
    server
    .post('/user/signin')
    .send({ email: 'testuseremail@gmail.com', password: 'testuserpassword' })
    .expect('Content-type', /json/)
    .expect(200);
    done();
  });

  it('should fail to sign in user with invalid email', (done) => {
    server
    .post('/user/signin')
    .send({ email: '', password: 'testuserpassword' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });

  it('should fail to sign in user with invalid password', (done) => {
    server
    .post('/user/signin')
    .send({ email: 'testuseremail@gmail.com', password: '' })
    .expect('Content-type', /json/)
    .expect(400)
    .end((err, res) => {
      res.status.should.equal(400);
      done();
    });
  });
});

