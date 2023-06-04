<template>
  <div>
    <h1>FCM push notifications</h1>
    <!-- <a href="" @click.prevent="authenticate()">Authenticate</a> -->
  </div>
</template>
<script>
// import { getAuth, signInAnonymously } from 'firebase-admin/auth';
// import { getMessaging, onMessage, getToken } from 'firebase-admin/messaging';

// import { messaging } from '@/plugins/firebase-admin';

// export default {
//     mounted() {
//         const messaging = getMessaging();
//         onMessage(messaging, (payload) => {
//             console.log('Message on client:', payload);
//         }) 
//     },
//     methods: {
//         async authenticate() {
//             await signInAnonymously(getToken());
//             this.activate();
//         },
//         async activate() {
//             const token = await getToken(messaging, {
//                 vapidKey: 'BEUUqHbYw5eVxU68gLtaQ9aBU52nBdlFRSnrFD-e7_s4izozsIWj6NNgpUVg_GXzCy76JP-8Tciw_HkmwWl3Qew',
//             });
    
//             if (token) {
//                 console.log(token);
//             } else {
//                 // permission request
//             }        
//         },
//     },
// }
</script>

<style>

</style>