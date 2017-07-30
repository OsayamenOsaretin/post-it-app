// import request from 'supertest';
// import { MockFirebase, MockFirebaseSdk } from 'firebase-mock';
// import express from 'express';
// import getAllUsersRoute from '../routes/get_all_users_route';

// /* global jest firebase */
// jest.unmock('superagent');
// const io = jest.genMockFromModule('socket.io');

// const app = express();

// // create mock database and auth constants
// const mockDatabase = new MockFirebase();
// const mockAuth = new MockFirebase();

// // create firebase sdk mock
// const mockFirebaseSdk = MockFirebaseSdk(path => (
//   mockDatabase.child(path)
// ), () => (
//   mockAuth
// ));

// // MockFirebase.override();

// describe('GetAllUsers', () => {
//   const groupId = {
//     groupId: 'testGroupId'
//   };

//   const testUser1 = {
//     id: 'testUser1Id',
//     email: 'testUser1Email@email.com'
//   };

//   const testUser2 = {
//     id: 'testUser2Id',
//     email: 'testUser2Email@email.com'
//   };
//   let ref;
//   const getRef = () => {
//     if (!ref) {
//       ref = mockFirebaseSdk.database().ref();
//     }
//     return ref;
//   };

//   beforeEach(() => {
//     getAllUsersRoute(app, mockFirebaseSdk, io);
//     // ref = undefined;
//   });

//   it('should get all users not in the group', async () => {
//     // const newRef = getRef('/users/');
//     // // const usersRef = newRef().child('/users/');

//     const usersRef = mockFirebaseSdk.database().ref('/users/');
//     usersRef.set('testUser1', testUser1);
//     usersRef.set('testUser2', testUser2);

//     // const groupRef = newRef().child('/groups/testGroupId/users');
//     // const groupRef = getRef('groups/testGroupId/users');
//     const groupRef = mockFirebaseSdk.database().ref('groups/testGroupId/users');
//     groupRef.set('testUser1', true);

//     // ref.flush();

//     console.log('request is about to be made');
//     // mockFirebaseSdk.auth().changeAuthState()
//     mockFirebaseSdk.auth().createUserWithEmailAndPassword(
//       'testUser1@email.com', 'testPassword'
//     ).then((user) => {
//       mockFirebaseSdk.database.ref().flush();
//     })
//     const response = await request(app)
//       .post('/users')
//       .send(groupId);
//     expect(1).toBe(1);
//   });
// });

