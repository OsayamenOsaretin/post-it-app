// mock for superagent - __mocks__/superagent.js

/* global jest */

let mockDelay;
let mockError;
let mockResponse = {
  status() {
    return 200;
  },
  ok() {
    return true;
  },
  body: {
    userList: {
      1: { userDisplay: 'firstUser' },
      2: { userDisplay: 'secondUser' }
    },
    groupMessages: {
      1: { message: 'test message' }
    },
    userObject: {
      username: 'testUser'
    }
  },
  get: jest.genMockFunction(),
  toError: jest.genMockFunction()
};

const Request = {
  post() {
    return this;
  },
  get() {
    return this;
  },
  send() {
    return this;
  },
  query() {
    return this;
  },
  field() {
    return this;
  },
  set() {
    return this;
  },
  accept() {
    return this;
  },
  timeout() {
    return this;
  },
  end: jest.genMockFunction().mockImplementation((callback) => {
    if (mockDelay) {
      this.delayTimer = setTimeout(callback, 0, mockError, mockResponse);

      return;
    }

    callback(mockError, mockResponse);
  }),
  // expose helper methods for tests to set
  __setMockDelay(boolValue) {
    mockDelay = boolValue;
  },
  __setMockResponse(mockRes) {
    mockResponse = mockRes;
  },
  __setMockError(mockErr) {
    mockError = mockErr;
  }
};

module.exports = Request;
