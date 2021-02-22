import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyBNit-Csb9nEIOQ7yOXeszK_jdNNzTwKnk",
  authDomain: "fir-fc298.firebaseapp.com",
  projectId: "fir-fc298",
  storageBucket: "fir-fc298.appspot.com",
  messagingSenderId: "1024622255174",
  appId: "1:1024622255174:web:4743b571ab3da21f1e3e47",
  measurementId: "G-PQNPZDG6TK"
};



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then(userCredentials => {
      // create a new user document if it doesn't exist
      const { user } = userCredentials;
      const userRef = firestore.collection('users').doc(user.uid);
      const snapshot = userRef.get();
      if (!snapshot.exists) {
        const { displayName, email, photoURL } = user;
        const createdAt = new Date();
        userRef.set({
          displayName,
          email,
          photoURL,
          createdAt
        }).then(() => console.log("user created successfully"))
          .catch((error) => console.log(`failed to create user, Error: ${error}`));
      }
    })
    .catch(error => {
      console.log(`error-message: ${error.message}, error-code: ${error.code}`);
    })
};
export const signOut = () => {
  try {
    auth.signOut()
  } catch (error) {
    console.error("Failed to sign out");
  }
};


window.firebase = firebase;


export default firebase;
