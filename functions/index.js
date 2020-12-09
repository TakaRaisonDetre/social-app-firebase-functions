const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();


const firebaseConfig = {
    apiKey: "AIzaSyBTwkJs1tMtvDlw14rtDn19MK11Fs-AAhA",
    authDomain: "social-post-4e48b.firebaseapp.com",
    projectId: "social-post-4e48b",
    storageBucket: "social-post-4e48b.appspot.com",
    messagingSenderId: "89891502783",
    appId: "1:89891502783:web:350485321e820ddc87e40a",
    measurementId: "G-57R4WQVPM7"
  };





const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)
const db = admin.firestore();


app.get('/screams', (req, res)=>{
    db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data=>{
        let screams =[]
        data.forEach(doc=>{
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle : doc.data().userHandle,
                createdAt : doc.data().createdAt
            });
        });
        return res.json(screams);
    })
    .catch(err=>console.error(err));
})



 app.post('/screams', (req, res)=>{
 
    const newScream ={
        body:req.body.body,
        userHandle : req.body.userHandle,
        createdAt : new Date().toISOString()
    }

   db
    .collection('screams')
    .add(newScream)
    .then((doc) => {
        res.json({message: `doc ${doc.id} created successfully`})
    })
    .catch(err=>{
        res.status(500).json({error: 'something went wrong'})
        console.error(err)
    })
 }) 

 // sign up route

 app.post('/signup', (req, res)=>{
     const newUser={
         email: req.body.email,
         password : req.body.password,
         confirmPassword : req.body.confirmPassword,
         handle: req.body.handle
     }
 // Validate Data

db.doc(`/users/${newUser.handle}`).get()
    .then(doc=>{
        if(doc.exists){
            return res.status(400).json({handle: 'this handle is already taken'})
        }else {
         return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
    })
    .then(data=>{
       return data.user.getIdToken();
        
    })
    .then(token=>{
       return res.status(201).json({token});
    })
    .catch(err=> {
        console.error(err);
        if(err.code ==="auth/email-already-in-use"){
            return res.status(400).json({email: 'Email is already in use'})
        }
        return res.status(500).json({error:err.code})
    })

       
 });

 exports.api = functions.https.onRequest(app);
