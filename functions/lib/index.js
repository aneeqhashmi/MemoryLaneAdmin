"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.getGlobal = functions.https.onRequest((req, res) => {
    const ref = admin.database().ref('MemoryShareGlobal').orderByChild('Modified');
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
exports.markUnReviewed = functions.https.onRequest((req, res) => {
    const ref = admin.database().ref('MemoryShareGlobal');
    ref.on("value", function (snapshot) {
        snapshot.forEach(element => {
            console.log(element.val().Reviewed);
            if (element.val().Reviewed == undefined) {
                console.log(element.key);
            }
        });
        res.end();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
exports.getFeatured = functions.https.onRequest((req, res) => {
    const ref = admin.database().ref('FeaturedShare').orderByChild('Modified');
    ref.on("value", function (snapshot) {
        res.send(snapshot.val());
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
});
console.log(functions.config().firebase);
//# sourceMappingURL=index.js.map