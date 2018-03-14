import * as functions from 'firebase-functions';

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// for dev account
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "memorylane-dev",
    "private_key_id": "fc628554b77e5e34651d4c26856342a21f56646a",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoLd7W6Q948st2\nIFiyRtAqZgU0YMb7NyeZUBZglkRB4MUiCophb2U/bI1HRX5/xgQk5UPpKJ4YgGWj\nbZ4g1WjVzQMrt7sVBnazzFFb8wjsZQYT8hGx9KE+UuBbTwAqW8tMhXR5j5U33cKN\nJ4qrRmv/AJkABsGeWn4yyz6bMQGfLVW8vhnneDUb85oeRsP/S2O9G8ZTOwMQsCKb\nr/mkYZ+9kwWdpimh70fzcjdOGbVtSIeYOynisaSCCJsjevCh7MJnqllgmGEa9hVe\nwSuWmk+eK7b+iQ/kjQRLu23z8po9PRfH4U9G2XtObwpM32wQkFkwMYp0RJT31YhV\n0/Bdj20jAgMBAAECggEARDdu9y9Lxlx9aOnP8GhG0ZvWKpvCum1x038nxH/PKgWZ\nEKjD3qfHosVOPQWUPRG95pVUSYPfNMMH9xVkmZ7WyjpBOf9plCquBVov+iMHkJOd\ntoNu6Ab5TIVjWcYepA/d06kiSJiUBzgdTRIn7jc/YQ0GAnu7F5dPLx0/xMVJCh45\nycOPubl7vhZwS6o+LoegOSE8oBuA8+gkmLi9I2VYo4UgD8PD+s82slZm0T2me4CK\n3JCoqOTOWh4H5pMeUXF9l1zFG83csXUm3tkD7jjHuCsbdo32aHcEQvcVM0aKQ+IP\nsQ6A0o0ezYOM3yOVkv3agqwf5ltt78XynKTZYg/QUQKBgQDc/grXNLviaYu1aKe4\n38CXRqyhiVMeaXEHpNMzszk4Y12Zu21Emo8edTvAmBZH7WsQZK4Ys1Ml4XajZUAe\noIt7goWIY6sJbtq8aZ4hAQ+DeLxShkYiUsuARLSMcZpP1MpNReGThYglPF9WH54H\ndJ6TnaCAGd5cVqKEZhtyV2lH+QKBgQDC0hUeOc6YwE9j89Y+zRcTJCFBw0AHQC7a\ntAQOY4p1Ts8L8Fxuvra7m2G4nS6kI8zNRnM8mjPFy5Ws2krCZicDiHzwG3l1EfyC\nJWAviunH4+JI0x5QdTolfODNKqyFXC+dYSX+1D3cSlZART/iQjcw70oveRP3erVb\nS8f1SRO8+wKBgQCLrQ2RA8WUzvz8hc8sbE+/zW2jE7azTBWirSzISojp+PPaDLp9\nV+sJZzODAR1kDM1UqS3Ycs8k7CIeGAq00OgYAmD/2W7rIWOjHmZRmegCQrdUuYVu\ngEIbKlGrSsorluTefkKbCRUJ4+Sl/InXUIBB8KjXDoKafi9t21ORq2nhkQKBgFX4\nTslfyQMvGdmJqGleJ2iS8PoMJx0L/aEU/xU6Z8cMV+F019Um44w2LRFCi2pzQdTz\n2bZMdbw68nmseoD+gwjUGg36kcZPgZYM2D0il7dVoG1yfFYU5OvWB32B70+KNpjE\nXfftwL6NLzJ9XIuDnMdDUQFR9LWouI7pCfv7m3IxAoGBAIWfEDQMm+lVNpXGSqdO\nqz9v+O63r2DpZ+9ATQljeLaZj9gKDwXlq7eb4SiZlaD8g6xOhvfBBnDn/wTGS/0Q\nvqPreYLOTYAapja6f8xjW6ShFjTwigKENwO2QHpDnOod5Ieyf9HuL4QvtH3VfNZG\nc4S7h1zmw2b6rVKxiohcB5Ct\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-cczmg@memorylane-dev.iam.gserviceaccount.com",
    "client_id": "116043497931793006619",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cczmg%40memorylane-dev.iam.gserviceaccount.com"
  }),
  databaseURL: `https://memorylane-dev.firebaseio.com`
});


const ref = admin.database().ref('MemoryShareGlobal');

ref.on("value", function(snapshot) {
  snapshot.forEach(element => {
    if(element.val().Reviewed == undefined){
      admin.database().ref('MemoryShareGlobal/'+element.key+'/Reviewed').set(false);
    }
  });
  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});  


const ref1 = admin.database().ref('FeaturedShare');

ref1.on("value", function(snapshot) {
  snapshot.forEach(element => {
    if(element.val().Reviewed == undefined){
      admin.database().ref('FeaturedShare/'+element.key+'/Reviewed').set(false);
    }
  });
  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});  

