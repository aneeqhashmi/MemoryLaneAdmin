"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
// for dev account
// admin.initializeApp({
//   credential: admin.credential.cert({
//     type: "service_account",
//     project_id: "memorylane-dev",
//     private_key_id: "fc628554b77e5e34651d4c26856342a21f56646a",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoLd7W6Q948st2\nIFiyRtAqZgU0YMb7NyeZUBZglkRB4MUiCophb2U/bI1HRX5/xgQk5UPpKJ4YgGWj\nbZ4g1WjVzQMrt7sVBnazzFFb8wjsZQYT8hGx9KE+UuBbTwAqW8tMhXR5j5U33cKN\nJ4qrRmv/AJkABsGeWn4yyz6bMQGfLVW8vhnneDUb85oeRsP/S2O9G8ZTOwMQsCKb\nr/mkYZ+9kwWdpimh70fzcjdOGbVtSIeYOynisaSCCJsjevCh7MJnqllgmGEa9hVe\nwSuWmk+eK7b+iQ/kjQRLu23z8po9PRfH4U9G2XtObwpM32wQkFkwMYp0RJT31YhV\n0/Bdj20jAgMBAAECggEARDdu9y9Lxlx9aOnP8GhG0ZvWKpvCum1x038nxH/PKgWZ\nEKjD3qfHosVOPQWUPRG95pVUSYPfNMMH9xVkmZ7WyjpBOf9plCquBVov+iMHkJOd\ntoNu6Ab5TIVjWcYepA/d06kiSJiUBzgdTRIn7jc/YQ0GAnu7F5dPLx0/xMVJCh45\nycOPubl7vhZwS6o+LoegOSE8oBuA8+gkmLi9I2VYo4UgD8PD+s82slZm0T2me4CK\n3JCoqOTOWh4H5pMeUXF9l1zFG83csXUm3tkD7jjHuCsbdo32aHcEQvcVM0aKQ+IP\nsQ6A0o0ezYOM3yOVkv3agqwf5ltt78XynKTZYg/QUQKBgQDc/grXNLviaYu1aKe4\n38CXRqyhiVMeaXEHpNMzszk4Y12Zu21Emo8edTvAmBZH7WsQZK4Ys1Ml4XajZUAe\noIt7goWIY6sJbtq8aZ4hAQ+DeLxShkYiUsuARLSMcZpP1MpNReGThYglPF9WH54H\ndJ6TnaCAGd5cVqKEZhtyV2lH+QKBgQDC0hUeOc6YwE9j89Y+zRcTJCFBw0AHQC7a\ntAQOY4p1Ts8L8Fxuvra7m2G4nS6kI8zNRnM8mjPFy5Ws2krCZicDiHzwG3l1EfyC\nJWAviunH4+JI0x5QdTolfODNKqyFXC+dYSX+1D3cSlZART/iQjcw70oveRP3erVb\nS8f1SRO8+wKBgQCLrQ2RA8WUzvz8hc8sbE+/zW2jE7azTBWirSzISojp+PPaDLp9\nV+sJZzODAR1kDM1UqS3Ycs8k7CIeGAq00OgYAmD/2W7rIWOjHmZRmegCQrdUuYVu\ngEIbKlGrSsorluTefkKbCRUJ4+Sl/InXUIBB8KjXDoKafi9t21ORq2nhkQKBgFX4\nTslfyQMvGdmJqGleJ2iS8PoMJx0L/aEU/xU6Z8cMV+F019Um44w2LRFCi2pzQdTz\n2bZMdbw68nmseoD+gwjUGg36kcZPgZYM2D0il7dVoG1yfFYU5OvWB32B70+KNpjE\nXfftwL6NLzJ9XIuDnMdDUQFR9LWouI7pCfv7m3IxAoGBAIWfEDQMm+lVNpXGSqdO\nqz9v+O63r2DpZ+9ATQljeLaZj9gKDwXlq7eb4SiZlaD8g6xOhvfBBnDn/wTGS/0Q\nvqPreYLOTYAapja6f8xjW6ShFjTwigKENwO2QHpDnOod5Ieyf9HuL4QvtH3VfNZG\nc4S7h1zmw2b6rVKxiohcB5Ct\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-cczmg@memorylane-dev.iam.gserviceaccount.com",
//     client_id: "116043497931793006619",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://accounts.google.com/o/oauth2/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cczmg%40memorylane-dev.iam.gserviceaccount.com"
//   }),
//   databaseURL: `https://memorylane-dev.firebaseio.com`
// });
// For Prod account
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "content-spatial--1513935922342",
        "private_key_id": "b4a35f76cf7890d7c672b0818428ca29d288c186",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC33dGAHsrCgCB3\n4dA40vMDdfIl+VjHVvNJupZGwkB/o9G73NqORmbdrTSUrfCrzAhQnnmddGq81o1u\n08zAAXdTDcR5D2J1/wkQuFmT1zivX/UULhY8NCS8LtqYDM8rYyyej8Abxza7ZiCD\nRwTJnKvKckkHqEQ+lBHt44wMinKUuzYasDGIRccwIB9MRgiLBHWgPPf0vPGjEPqB\nvCU/1kTYqrNU+oHRKCmAghOyVu/Lss0DtnWP6dqdV1trkWFg9vpTKAwtMkydC7Hk\nWg8I2QOU0V662VY8XNcOixEQcwHoql6okW6bP31Ecodva7oH4jWj/zAZf5gNZZNz\n7IcACFX3AgMBAAECggEAKn+O6Po1C3fqCUucgUXg/a/JZJWZu5mRaj1CduB3YAlR\ndQa7TZ9gL2TVfngl5M+oLFo06fv6n+NHlZJHBSpRllTcUM8JhxSH1+GEcvOQGpkn\nYJ62bPvwcb6yr+pmCDVIHu5DDSiisfYNFcrYhHE+E/EOiEKQY5Z9/mpV+KAXk+C8\n1cJa6BUAqCjYq/nwdFwbg1VC172l2mINuRiJzwKpVKydE+ooXd9XUCAV+RDXXIf4\nZ7h7pRpGhSfJ0tEGp676/AH5PnnUbboViI7aatAoXPvrRQs0U8X5sV0fuV7LhbC/\n3EdQCVGMtz8qtN6XQ8rE7DoJHpmevGnzRLD6KoRIoQKBgQDy3j3PheHSdSaKTOd5\npGfN1uk5HW/a1Fyst5O41dp0e1W29c/x4lTQDmO3MM1rFhTDbMBW/02k59Exh+1y\nh5O971okLQa5UTXZB3XSL41pwNy04qYSbWlm7nAYVW+0Jvzjkzug2FKNIfg6e527\nVc83aUn7LkZ/hiHoZrzHulynPQKBgQDBzuGkA1agWKjanH6X2kyemjJzHMkKO76C\ndtY9pIRcCWhsx/Vsk+iw3HaLIVzlN/X4BN0M9lC1E5V1WqKfrY4vKEznp7KodmFz\n9aBiipDWPiZpm8q7i3KRdpXZdRJ/owznxClz+nc2bMWS2Y3XLVd1oJkhTd9NBNpa\nbZRa09vlQwKBgQC/pXW7A1e+XilqauMhzwUGnfbt1ffFA1yaAka0TTSURBrQREqy\nAbqRbzlqfj0qqoL57yAbxlx7q14dKrjJboi8EVrdPxaWN6o5NzTXBiUd9U10A4Gu\n+t14luCnowuBal6WKkGcW/dQXSTm6VL/V+grPo9dgReqW6r4G9IN/VZNtQKBgEmP\np69kIP4tiLGpUpd6oThV2K4+j8QVlyLXzkuJZT+1xm/7mZjDrz9p/oiieir6iZ7A\n4dIor8t7CnCHnVA0RNJ7Xm1TBonQnP6xjVW5uG3JGzVcj5+Nt0elFg161TGjBqP1\nnbJKr/L1aCxr7N1udVLNSTIN56LJI8PM8dFjtoQXAn9zxdPLe3rGiV/pA0dnCBrf\nIqmL7/T7+/eULJet2c+XEek0r3iLxZJNHaejyd4jPZRDPHhLpQTbmvRb3Fh35yO7\nVgCRgOaddqfkv/buakFlyCE9K8KYr+87YAMK5pat1aBgWTbV3CAMeLKgX3XwWhkI\nRDie5qEaIwnfPexm4IX0\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-x0p67@content-spatial--1513935922342.iam.gserviceaccount.com",
        "client_id": "112232654506371364965",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x0p67%40content-spatial--1513935922342.iam.gserviceaccount.com"
    }),
    databaseURL: `https://content-spatial-1513935922342.firebaseio.com`
});
console.log('Starting process of marking Reviewed flag');
const ref = admin.database().ref('MemoryShareGlobal-v1');
ref.on("value", function (snapshot) {
    console.log('1');
    console.log(snapshot);
    snapshot.forEach(element => {
        console.log('2');
        if (element.val().Reviewed == undefined) {
            admin.database().ref('MemoryShareGlobal-v1/' + element.key + '/Reviewed').set(false);
        }
    });
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
console.log('3');
const ref1 = admin.database().ref('FeaturedShare-v1');
ref1.on("value", function (snapshot) {
    console.log('4');
    snapshot.forEach(element => {
        if (element.val().Reviewed == undefined) {
            admin.database().ref('FeaturedShare-v1/' + element.key + '/Reviewed').set(false);
        }
    });
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
console.log('5');
//# sourceMappingURL=firebase-changes.js.map