<template>
  <div>
    <Slider />

      <div class="container">
        <h3 class="text-lg md:text-4xl mb-6">Shop by Category</h3>
        <div class="flex items-center mb-6">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>

        <CarouselCategories />
        <!-- Daily -->
        <h3 class="text-xl md:text-4xl mb-6">Deals of the Day</h3>
        <div class="flex items-center mb-6">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>
        
        <div v-if="dailyDeals.length > 0">
          <CarouselDeals :deals="dailyDeals" />
        </div>
        
        <!-- Weekly -->
        <h3 class="text-xl md:text-4xl mb-6">Deals of the Week</h3>
        <div class="flex items-center mb-6">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>
        
        <div v-if="weeklyDeals.length > 0">
          <CarouselDeals :deals="weeklyDeals" />
        </div>

        <h3 class="text-xl md:text-4xl mb-6">Popular Brand</h3>
        <div class="flex items-center mb-6">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>
    
        <CarouselProductBrands />        
      </div>     
      <Deal />      
  </div>
</template>

<script>
'use strict';
import {mapActions, mapState} from "vuex";
import { firebaseApp } from "~/plugins/firebase.js"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

export default {
  name: 'IndexPage',
  data() {
    return {
      img: require('~/assets/img/logo.png'),
      token: ''
    }
  },
  async mounted() {
    await this.getDailyDeals();
    await this.getWeeklyDeals();
    
    const messaging = getMessaging(firebaseApp);
    
    onMessage(messaging, (payload) => {
         console.log('Message on client:', payload);
         
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            let title = payload.notification.title;
            let body = payload.notification.body;
            
            new Notification(title, {
              body: body,
              icon: this.img,              
            });
          } else {
            console.log('Unable to get permission to notify.');
          }
        });

    });
       
    const token = await getToken(messaging, {
              vapidKey: 'BEUUqHbYw5eVxU68gLtaQ9aBU52nBdlFRSnrFD-e7_s4izozsIWj6NNgpUVg_GXzCy76JP-8Tciw_HkmwWl3Qew',
    });

    if (token) {
      console.log(token);
      this.token = token;
      this.sendTokenToServer(token);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
    
  },
  methods: {
    ...mapActions('deals', ['getDailyDeals', 'getWeeklyDeals']),    
    async sendTokenToServer(currentToken) {
      
      if (!this.isTokenSentToServer()) {
        console.log('Sending token to server...');
         await this.$axios.$post('/devices', { token: currentToken })
         .then(response => {
            // console.log('device', response.data);
            this.setTokenSentToServer(true);
          })
          .catch(error => {
              console.log(error);
          });      
                  
      } else {
        console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
      }
    },

    isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    },

    setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    },

  },
  computed: {
    ...mapState('deals', ['dailyDeals', 'weeklyDeals']),    
  }
}  
</script>
