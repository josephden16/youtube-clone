import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyDBUd8ZvqpPX9j_wV6PnRubOhu-Qbz3gwo",
  authDomain: "fir-fc298.firebaseapp.com",
  projectId: "fir-fc298",
  storageBucket: "fir-fc298.appspot.com",
  messagingSenderId: "1024622255174",
  appId: "1:1024622255174:web:22af8dc5d74b3f7b1e3e47",
  measurementId: "G-8MZ3DQN4L6"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

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

export const createUserProfileDocument = async (authenticatedUser, additionalData) => {
  if (!authenticatedUser) return;

  const user = authenticatedUser;

  const userRef = firestore.collection("users").doc(user.uid);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    try {
      userRef.set({
        displayName,
        email,
        photoURL,
        createdAt: new Date(),
        ...additionalData
      });
      console.log("user created successfully")
    } catch (error) {
      console.log(`error-message: ${error.message}, error-code: ${error.code}`);
    }
  }

  return getUserDocument(user.uid);

}

export const createUserChannelDocument = async (authenticatedUser) => {
  if (!authenticatedUser) return;

  const user = authenticatedUser;

  const channelRef = firestore.collection("channels").doc(user.uid);
  const snapshot = await channelRef.get();

  if (snapshot.exists) return;

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    try {
      channelRef.set({
        channelName: displayName,
        email,
        channelPhotoURL: photoURL,
        createdAt: new Date(),
      });
      console.log("channel created successfully")
    } catch (error) {
      console.log(`error-message: ${error.message}, error-code: ${error.code}`);
    }
  }
}

const getUserDocument = (uid) => {
  if (!uid) return null;

  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.log('Error fetching user document', error.message);
  }
}

export const signOut = () => {
  try {
    auth.signOut()
  } catch (error) {
    console.error("Failed to sign out");
  }
};


window.firebase = firebase;


export default firebase;
