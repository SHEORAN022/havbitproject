const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require(
  path.join(__dirname, "../havbit-website-login-firebase-adminsdk-fbsvc-4279d9ddcc.json")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
