import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyA7CW_Bh0GpULiqE-PnNVFN2ic-uLDR32A",
  authDomain: "clone-dbe6b.firebaseapp.com",
  projectId: "clone-dbe6b",
  storageBucket: "clone-dbe6b.appspot.com",
  messagingSenderId: "215907952330",
  appId: "1:215907952330:web:1232fc4901c42a9cf07633",
  measurementId: "G-VWEP4R7JHM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then(userCredential => {
      const { user } = userCredential;
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
          .catch("failed to create user");
      }
    })
    .catch(error => {
      console.log(`error: ${error.message}`);
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
