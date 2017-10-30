import firebase, { mockAuth, mockDatabase } from 'firebase';
import getUsersEmailNumbers from '../../utility/getUsersEmailsNumbers';

/* global jest */

describe('GetEmailsAndNumbers', () => {
  const database = firebase.database();
  const groupReference = database.ref('groups/testGroupId/users');

  groupReference.set({
    testUserId: 'someUser'
  });

  database.ref('users/testUserId/email').set('testEmail');
  database.ref('users/testUserId/number').set('testPhonenumber');

  mockDatabase.flush();
  it('should not call the callback function when priority is normal',
    (done) => {
      const mockCallback = jest.fn();
      mockAuth.autoFlush();
      mockDatabase.autoFlush();

      getUsersEmailNumbers(firebase, 'testGroupId', 'normal', mockCallback)
        .then(() => {
          expect(mockCallback).not.toHaveBeenCalled();
          done();
        });
    });

  it('should call the callback function when priority is not normal',
    (done) => {
      const mockCallback = jest.fn();
      mockAuth.autoFlush();
      mockDatabase.autoFlush();

      getUsersEmailNumbers(firebase, 'testGroupId', 'critical', mockCallback)
        .then(() => {
          expect(mockCallback).toHaveBeenCalled();
          done();
        });
    });
});
