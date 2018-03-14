"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.getGlobal = functions.https.onRequest((req, res) => {
    const ref = admin.database().ref('MemoryShareGlobal').orderByChild('Modified').limitToFirst(100);
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
exports.getFeatured = functions.https.onRequest((req, res) => {
    const ref = admin.database().ref('FeaturedShare').orderByChild('Modified').limitToFirst(100);
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
//# sourceMappingURL=index.js.map