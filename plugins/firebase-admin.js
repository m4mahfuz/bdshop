var admin = require("firebase-admin");

var serviceAccount = require("/home/user/Downloads/service-account-file.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
