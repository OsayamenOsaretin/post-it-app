'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _supertest2.default.agent('http://localhost:6969');

describe('Landing page route', function () {
  it('should return home page', function (done) {
    // calling home page api
    server.get('/').expect('Content-type', /json/).expect(200).end(function (err, res) {
      // Http status should be 200
      res.status.should.equal(200);
      // Error should be false
      done();
    });
  });
});

describe('Sign up route', function () {
  it('should succesfully register user', function (done) {
    server.post('/user/signup').send({ userName: 'testUser', email: 'testerUserEmail@email.com', password: 'thePassword' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      res.body.message.should.equal('Welcome to the Post It, An email has been sent to you');
      done();
    });
  });

  it('should fail to register for empty username or password fields', function (done) {
    server.post('/user/signup').send({ userName: '', email: 'testemail@email.com', password: '' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      res.body.message.should.equal('Please make sure you enter all data');
      done();
    });
  });

  it('should fail to register for invalid email address', function (done) {
    server.post('/user/signup').send({ userName: 'testUser', email: 'invalidemailstring', password: 'thePassword' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      res.body.message.should.equal('Please use a valid email address');
      done();
    });
  });

  it('should fail to register user with existing email address', function (done) {
    server.post('/user/signup').send({ useName: 'Red Ranger', email: 'redrangerranging@ranger.com', password: 'supersecretpassword' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      done();
    });
  });
});

describe('Sign in route', function () {
  it('should successfully sign in an existing user', function (done) {
    server.post('/user/signin').send({ email: 'redrangerranging@ranger.com', password: 'supersecretpassword' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      res.body.message.should.equal('Welcome User, or Ranger.');
      done();
    });
  });

  it('should check that user fills in password field', function (done) {
    server.post('/user/signin').send({ email: 'redrangerranging@ranger.com', password: '' }).expect('Content-type', /json/).expect(400).end(function (err, res) {
      res.status.should.equal(400);
      res.body.message.should.equal('Please fill in your password');
      done();
    });
  });

  it('should check that user fills in valid email', function (done) {
    server.post('/user/signin').send({ email: '', password: 'supersecretpassword' }).expect('Content-type, /json/').expect(400).end(function (err, res) {
      res.status.should.equal(400);
      res.body.message.should.equal('Please use a valid email address');
      done();
    });
  });

  it('should check that user signs in with right password', function (done) {
    server.post('/user/signin').send({ email: 'yellowrangerranging@ranger.com', password: 'wrongpassword' }).expect('Content-type', /json/).expect(401).end(function (err, res) {
      res.status.should.equal(401);
      done();
    });
  });
});

describe('Add group route', function () {
  it('should successfuly add group for signed in user', function (done) {
    server.post('/group').send({ groupName: 'Wild force' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });
});

describe('Add user to group route', function () {
  it('should successfully add user to group for signed in user', function (done) {
    server.post('/group/-Kl3PeLawV_eEs8ebqZG/user').send({ userId: 'Tp4nppWmcES2dVPe6abUGyV3UDl1' }).expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });
});

describe('Sign out route', function () {
  it('should successfuly sign out user', function (done) {
    server.get('/signout').expect('Content-type', /json/).expect(200).end(function (err, res) {
      res.status.should.equal(200);
      done();
    });
  });
});

describe('Add group and add user to group route', function () {
  it('should fail to create group when no signed in user', function (done) {
    server.post('/group').send({ groupName: 'Another Wild Force' }).expect('Content-type', /json/).expect(403).end(function (err, res) {
      res.status.should.equal(403);
      done();
    });
  });

  it('should fail to add user to a group when no signed in user', function (done) {
    server.post('/group/-Kl3PeLawV_eEs8ebqZG/user').send({ userId: 'Tp4nppWmcES2dVPe6abUGyV3UDl1' }).expect('Content-type', /json/).expect(403).end(function (err, res) {
      res.status.should.equal(403);
      done();
    });
  });
});