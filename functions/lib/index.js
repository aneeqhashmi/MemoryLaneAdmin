"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.getGlobal = functions.https.onRequest((req, res) => {
    // For now limit data to top 50 memories
    const ref = admin.database().ref('MemoryShareGlobal-v1').orderByChild('Modified').limitToLast(50);
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send({});
    });
});
exports.getFeatured = functions.https.onRequest((req, res) => {
    // For now limit data to top 50 memories
    const ref = admin.database().ref('FeaturedShare-v1').orderByChild('Modified').limitToLast(50);
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        res.send({});
    });
});
//# sourceMappingURL=index.js.map