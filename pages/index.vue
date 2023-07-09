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

        <!-- <div class="flex -mx-6 mb-14">
          <div class="w-1/2 px-6">
            <div class="promo-bg-1 bg-cover bg-gray-500 bg-center p-12 rounded">
              <div class="w-2/3">
                <p class="bs-dark-orange-color text-2xl mb-6">Buy 1 Get 1</p>
                <h3 class="font-bold font-size-46 mb-8 leading-tight">Fresh Fruits Collection</h3>
                <nuxt-link to="/" class="bs-white-btn">Order Now</nuxt-link>
              </div>
            </div>
          </div>

          <div class="w-1/2 px-6">
            <div class="promo-bg-2 bg-cover bg-gray-500 bg-center p-12 rounded">
              <div class="w-2/3">
                <p class="bs-dark-orange-color text-2xl mb-6">Buy 1 Get 1</p>
                <h3 class="font-bold font-size-46 mb-8 leading-tight">Fresh Fruits Collection</h3>
                <nuxt-link to="/" class="bs-white-btn">Order Now</nuxt-link>
              </div>
            </div>
          </div>
        </div> -->

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
        
        <!-- <div class="flex -mx-6 mb-12">
          <div class="w-1/3 px-6">
            <div class="cta-1 flex p-6 rounded-xl">
              <div class="w/1-2">
                <h3 class="font-size-32 leading-tight font-semibold mb-6">Fresh Fruits Collection</h3>
                <nuxt-link to="/" class="h-12 w-12 flex justify-center items-center rounded-full bg-white inline-block"><img src="~/assets/img/arrow-right.png" alt=""></nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img src="~/assets/img/fresh-fruit.png" alt="">
              </div>
            </div>
          </div>

          <div class="w-1/3 px-6">
            <div class="cta-2 flex p-6 rounded-xl">
              <div class="w/1-2">
                <h3 class="font-size-32 leading-tight font-semibold mb-6">Vegetable Collection</h3>
                <nuxt-link to="/" class="h-12 w-12 flex justify-center items-center rounded-full bg-white inline-block"><img src="~/assets/img/arrow-right.png" alt=""></nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img src="~/assets/img/vegetable-collection.png" alt="">
              </div>
            </div>
          </div>

          <div class="w-1/3 px-6">
            <div class="cta-3 flex p-6 rounded-xl">
              <div class="w/1-2">
                <h3 class="font-size-32 leading-tight font-semibold mb-6">Grocery Items</h3>
                <nuxt-link to="/" class="h-12 w-12 flex justify-center items-center rounded-full bg-white inline-block"><img src="~/assets/img/arrow-right.png" alt=""></nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img class="h-40" src="~/assets/img/grocery-items.png" alt="">
              </div>
            </div>
          </div>
        </div> -->

      </div>     
      <Deal />      
    <!-- </div> -->
  </div>
</template>

<script>
'use strict';
// import dealsOfTheWeekProducts from 'assets/deals-of-the-weeks-products.json';
import {mapActions, mapState} from "vuex";
import { firebaseApp } from "~/plugins/firebase.js"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
// import { messaging } from '@/plugins/firebase';

export default {
  // layout: 'default',
  name: 'IndexPage',
  data() {
    return {
      // dealsOfTheWeekProducts: [],
      img: require('~/assets/img/logo.png'),
      token: ''
    }
  },
  async mounted() {
    // await this.getSlides();
    await this.getDailyDeals();
    await this.getWeeklyDeals();
    
    // const firebaseConfig = {
    //   apiKey: "AIzaSyC9sAIeBv6pKemsUasHMkiaAePjes4AWfU",
    //   authDomain: "bengalshop-a5316.firebaseapp.com",
    //   projectId: "bengalshop-a5316",
    //   storageBucket: "bengalshop-a5316.appspot.com",
    //   messagingSenderId: "741981622787",
    //   appId: "1:741981622787:web:141e5ebc9a7efc77d83436"
    // };

    // const app = initializeApp(firebaseConfig);
    // const isSupportedBrowser = await isSupported();
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
        // updateUIForPushEnabled(token);
    } else {
      // Show permission request.
      console.log('No registration token available. Request permission to generate one.');
      // Show permission UI.
      // updateUIForPushPermissionRequired();
      // setTokenSentToServer(false);
    }
    
  },
  methods: {
    ...mapActions('deals', ['getDailyDeals', 'getWeeklyDeals']),    
    // ...mapActions('slides', ['getSlides']),    
    // linkTo(url) {
    //   return url === null ? '/#' : `/${url}`;
    // },
    // url(image) {
    //   // console.log(image)
    //   let path = `/storage/images/slides/large/`;
    //   // let name = image.name;
    //   return `${this.$config.baseURL}${path}${image}`;
    // },
     // Send the registration token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
    async sendTokenToServer(currentToken) {
      
      if (!this.isTokenSentToServer()) {
        console.log('Sending token to server...');
        // TODO(developer): Send the current token to your server.
         await this.$axios.$post('/devices', { token: currentToken })
         .then(response => {
            console.log('device', response.data);
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
    // ...mapState('slides', ['slides']),
  }
}  
</script>
