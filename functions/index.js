const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {getAllScreams, postOneScream, getScream, commentOnScream} = require('./handlers/scream');
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/users')

// scream
app.get('/screams', getAllScreams)
app.post('/screams', FBAuth, postOneScream) 
app.get('/screams/:screamId', getScream );
// Todo : delete screan
// Tod like a scream
// Todo : unlike a scream
app.post('/screams/:screamId/comment', FBAuth, commentOnScream)

 //  users routes
 app.post('/signup', signup);
 app.post('/login', login );
 app.post('/user/image',FBAuth, uploadImage);
 app.post('/user', FBAuth, addUserDetails);
 app.get('/user', FBAuth, getAuthenticatedUser)

 exports.api = functions.https.onRequest(app);
