// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js');

// const firebaseConfig = {
    //     apiKey: "AIzaSyC9sAIeBv6pKemsUasHMkiaAePjes4AWfU",
//     authDomain: "bengalshop-a5316.firebaseapp.com",
//     projectId: "bengalshop-a5316",
//     storageBucket: "bengalshop-a5316.appspot.com",
//     messagingSenderId: "741981622787",
//     appId: "1:741981622787:web:141e5ebc9a7efc77d83436"
//   };

//   firebase.initializeApp(firebaseConfig);
//   const messaging = firbase.messaging();
//   messaging.onBackgroundMessage(payload => {
    //     console.log(
        //         '[firbase-messaging-sw.js] Received background message',
        //         payload
        //     );
        //   });
        
// import { } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-SERVICE.js';

// import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// // import { getAuth } from "firebase/auth";
// import { getMessaging, getToken, onMessage, onBackgroundMessage, isSupported } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging.js";

//working
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js');



const firebaseConfig = {
    apiKey: "AIzaSyC9sAIeBv6pKemsUasHMkiaAePjes4AWfU",
    authDomain: "bengalshop-a5316.firebaseapp.com",
    projectId: "bengalshop-a5316",
    storageBucket: "bengalshop-a5316.appspot.com",
    messagingSenderId: "741981622787",
    appId: "1:741981622787:web:141e5ebc9a7efc77d83436"
  };

  const app = firebase.initializeApp(firebaseConfig);
//   const messaging = getMessaging(app);
  const messaging = firebase.messaging();
//   messaging.getToken({vapidKey: "BEUUqHbYw5eVxU68gLtaQ9aBU52nBdlFRSnrFD-e7_s4izozsIWj6NNgpUVg_GXzCy76JP-8Tciw_HkmwWl3Qew"});
    messaging.onBackgroundMessage(payload => {
        console.log(
            '[firbase-messaging-sw.js] Received background message',
            payload
        );       
        
        const notificationTitle = payload.notification.title; //'Background Message Title';
        
        const notificationOptions = {
            body: payload.notification.body,
            icon: '/favicon.png'
        };

        self.registration.showNotification(notificationTitle,
            notificationOptions);
   });