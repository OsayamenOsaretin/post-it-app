'use strict';

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _serviceAccountKey = require('../service-account-key.json');

var _serviceAccountKey2 = _interopRequireDefault(_serviceAccountKey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

admin.initializeApp({
  credential: admin.credential.cert(_serviceAccountKey2.default),
  databaseURL: 'https://test-postit-df14c.firebaseio.com'
});

var user = void 0;
var users = [];

var userRef = admin.database.ref('/users');
userRef.once('value').then(function (snapShot) {
  snapShot.forEach(function (childSnapshot) {
    user = childSnapshot.val();
    users.push(user);
  });
});

var deleteUser = function deleteUser(userParams) {
  return new Promise(function (resolve) {
    admin.auth().deleteUser(userParams.uid).then(function () {
      resolve(user);
    }).catch(function () {
      resolve(user);
    });
  });
};

function nukeDb() {
  admin.database.ref().remove().then(function () {
    process.exit();
  }).catch(function () {
    process.exit();
  });
}

if (users.length > 0) {
  var promises = users.map(function (eachUser) {
    return deleteUser(eachUser);
  });
  Promise.all(promises).then(nukeDb).catch();
} else {
  nukeDb();
}