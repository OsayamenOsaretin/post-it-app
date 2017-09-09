import { mockAuth, mockDatabase } from 'firebase';
import userSignUp from '../controllerFunctions/userSignUp';

/* global jest */


const result = {
  send: jest.fn(),
  body: {
    message: ''
  },
  editMessageObject: (messageObject) => {
    result.body.message = messageObject;
  }
};
result.status = jest.fn().mockReturnValue(result);

const request = {
  body: {
  },
  params: {
    userId: 'testUserId'
  }
};

describe('SignIn', () => {
  it('should send correct response when invalid email is recieved', () => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request.body.email = 'badTestEmail';
    userSignUp(request, result);
    expect(result.send).toHaveBeenCalledWith({
      message: 'Something went wrong, Please use a valid email address'
    });
  });

  it('should send correct response when incorrect password is recieved', () => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request.body.email = 'goodEmail@email.com';
    request.body.userName = 'testUserName';
    request.body.password = undefined;
    userSignUp(request, result);
    expect(result.send).toHaveBeenCalledWith({
      message: 'Please make sure you enter all data'
    });
  });

  it('should send correct status when authentication passes', (done) => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    request.body.password = 'goodTestPassword';
    userSignUp(request, result)
      .then(() => {
        expect(result.status).toHaveBeenCalledWith(200);
        done();
      });
  });

  it('should send correct response when authentication fails', (done) => {
    mockAuth.autoFlush();
    mockDatabase.autoFlush();
    const error = new Error('error');
    mockAuth.failNext('signInWithEmailAndPassword', error);
    userSignUp(request, result)
      .then(() => {
        expect(result.status).toHaveBeenCalledWith(500);
        done();
      });
  });
});
