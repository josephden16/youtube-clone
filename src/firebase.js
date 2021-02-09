import firebase from 'firebase';
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


window.firebase = firebase;


export default firebase;
