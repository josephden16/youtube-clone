//* Here is is the code snippet to initialize Firebase Messaging in the Service
//* Worker when your app is not hosted on Firebase Hosting.
//* Give the service worker access to Firebase Messaging.
//* Note that you can only use Firebase Messaging here. Other Firebase libraries
//* are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

const firebaseConfig = {
  apiKey: "AIzaSyDBUd8ZvqpPX9j_wV6PnRubOhu-Qbz3gwo",
  authDomain: "fir-fc298.firebaseapp.com",
  projectId: "fir-fc298",
  storageBucket: "fir-fc298.appspot.com",
  messagingSenderId: "1024622255174",
  appId: "1:1024622255174:web:22af8dc5d74b3f7b1e3e47",
  measurementId: "G-8MZ3DQN4L6"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/favicon.ico'
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});