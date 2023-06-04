// import { initializeApp, getApps } from "firebase-admin/app";
// import { getMessaging, isSupported } from "firebase-admin/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyC9sAIeBv6pKemsUasHMkiaAePjes4AWfU",
//   authDomain: "bengalshop-a5316.firebaseapp.com",
//   projectId: "bengalshop-a5316",
//   storageBucket: "bengalshop-a5316.appspot.com",
//   messagingSenderId: "741981622787",
//   appId: "1:741981622787:web:141e5ebc9a7efc77d83436"
// };

// // Initialize Firebase
// const apps = getApps();
// const app = !apps.length ? initializeApp(firebaseConfig) : apps[0]; 
// export const messaging = getMessaging(app);
// // console.log(app)
// // const messaging = (async () => {
// //   try {
// //       const isSupportedBrowser = await isSupported();
// //       if (isSupportedBrowser) {
// //           return getMessaging(app);
// //       }
// //       console.log('Firebase not supported this browser');
// //       return null;
// //   } catch (err) {
// //       console.log(err);
// //       return null;
// //   }
// //   })();

// //   export { messaging };

// new
// import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
import { getMessaging } from "firebase/messaging";

// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

const firebaseConfig = {
  apiKey: "AIzaSyC9sAIeBv6pKemsUasHMkiaAePjes4AWfU",
  authDomain: "bengalshop-a5316.firebaseapp.com",
  projectId: "bengalshop-a5316",
  storageBucket: "bengalshop-a5316.appspot.com",
  messagingSenderId: "741981622787",
  appId: "1:741981622787:web:141e5ebc9a7efc77d83436"
};

export const firebaseApp = initializeApp(firebaseConfig);



// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = getMessaging(firebaseApp);
// const messaging = {}

// if (process.browser) {
//   messaging.fire = getMessaging(firebaseApp)
  
//   onBackgroundMessage(payload => {
//   console.log(
//       '[firbase-messaging-sw.js] Received background message',
//       payload
//   );
  
  // //
  // const notificationTitle = payload.notification.title; //'Background Message Title';
  // const notificationOptions = {
  //     body: payload.notification.body,
  //     icon: 'favicon.png'
  // };

  // self.registration.showNotification(notificationTitle,
  //     notificationOptions);
// });

// }
// console.log('m', messaging);
// export { messaging };
// messaging.onBackgroundMessage(payload => {
//   console.log(
//       '[firbase-messaging-sw.js] Received background message',
//       payload
//   );
  
  // //
  // const notificationTitle = payload.notification.title; //'Background Message Title';
  // const notificationOptions = {
  //     body: payload.notification.body,
  //     icon: 'favicon.png'
  // };

  // self.registration.showNotification(notificationTitle,
  //     notificationOptions);
// });
