const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {getAllScreams, postOneScream} = require('./handlers/scream');
const {signup, login} = require('./handlers/users')

// scream
app.get('/screams', getAllScreams)
app.post('/screams', FBAuth, postOneScream) 

 //  users routes
 app.post('/signup', signup);
 app.post('/login', login )

 exports.api = functions.https.onRequest(app);
