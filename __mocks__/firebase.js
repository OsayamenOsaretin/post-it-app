import { MockFirebase, MockFirebaseSdk } from 'firebase-mock'; // eslint-disable-line

export const mockDatabase = new MockFirebase();
export const mockAuth = new MockFirebase();

/* global jest */

/**
 * function to mock path
 * @return {object} path
 * @param {*} path 
 */
function mockPathFn(path) {
  return path ? mockDatabase.child(path) : mockDatabase;
}

/**
 * function to mock auth
 * @return {object} mockAuth
 */
function mockAuthFn() {
  return mockAuth;
}
const firebase = MockFirebaseSdk(mockPathFn, mockAuthFn);
firebase.auth.GoogleAuthProvider.credential = jest.fn(() => 'test');

export default firebase;

