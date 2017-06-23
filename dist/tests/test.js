'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _mocha = require('mocha');

var _mocha2 = _interopRequireDefault(_mocha);

var _chai = require('chai');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { firebase } from '../firebase';

/* global before */
/* global beforeEach */

var server = _supertest2.default.agent('http://localhost:6969');

describe('Sign up route function', function () {
  var signUpStub = void 0;

  before(function () {
    // configure firebase
    var config = {
      apiKey: 'AIzaSyAOCl6QRw5NYGGENE8URKteNO1rV7f1yo8',
      authDomain: 'post-it-69a9a.firebaseapp.com',
      databaseURL: 'https://post-it-69a9a.firebaseio.com',
      projectId: 'post-it-69a9a',
      storageBucket: 'post-it-69a9a.appspot.com',
      messagingSenderId: '383450311400'
    };
    _firebase2.default.initializeApp(config);
    signUpStub = _sinon2.default.stub(_firebase2.default.auth(), 'createUserWithEmailAndPassword');
  });

  afterEach(function () {
    signUpStub.restore();
  });

  it('should sign up user with valid email and password', function (done) {
    server.post('/user/signup').send({ userName: 'testUser', email: 'anothertestuser@gmail.com', password: 'validpassword' }).expect('Content-type', /json/).expect(200);
    done();
  });

  it('should return 400 error status in case of invalid email string', function (done) {
    server.post('/user/signup').send({ userName: 'testUser', email: 'invalidemailstring', password: 'thePassword' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      res.body.message.should.equal('Please use a valid email address');
      done();
    });
  });

  it('should fail to sign up user with invalid password', function (done) {
    server.post('/user/signup').send({ userName: 'testUser', email: 'testuser@gmail.com', password: '' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      done();
    });
  });
});

describe('Sign in route', function () {
  var signInStub = void 0;

  beforeEach(function () {
    // configure firebase
    signInStub = _sinon2.default.stub(_firebase2.default.auth(), 'signInWithEmailAndPassword');

    // signInStub = sinon.stub(global, 'Firebase');
  });

  afterEach(function () {
    signInStub.restore();
  });

  it('should sign in user with valid email and password', function (done) {
    server.post('/user/signin').send({ email: 'testuseremail@gmail.com', password: 'testuserpassword' }).expect('Content-type', /json/).expect(200);
    done();
  });

  it('should fail to sign in user with invalid email', function (done) {
    server.post('/user/signin').send({ email: '', password: 'testuserpassword' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      done();
    });
  });

  it('should fail to sign in user with invalid password', function (done) {
    server.post('/user/signin').send({ email: 'testuseremail@gmail.com', password: '' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      done();
    });
  });
});