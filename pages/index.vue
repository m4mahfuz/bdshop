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
        <!-- Banner -->
        <div v-if="banners.length > 0" class="flex flex-col md:flex-row gap-6 mb-14">
          <div v-for="(banner, bannerIndex) in banners" :key="banner.id" class="w-full md:w-1/2">
            <BackgroundImage :image-url="url(banner.image)">
              <div class="w-full md:w-2/3 p-3 lg:p-6 absolute top-0 left-0 ">
                <p class="bs-dark-orange-color text-xl lg:text-2xl mb-2 lg:mb-6">{{banner.title}}</p>                
                <!-- Splitting the description -->
                <div class="mb-4 lg:mb-8 leading-tight">
                  <template v-for="(part, index) in banner.description.split('/b')">
                    <h3 v-if="index === 0" :key="`h3-${bannerIndex}-${index}`" class="font-medium text-lg md:text-xl text-red-400">{{ part }}</h3>
                    <p v-else :key="`p-${bannerIndex}-${index}`" class="font-semibold  xl:text-4xl  text-gray-600">{{ part }}</p>
                  </template>
                </div>
              </div>
              <button @click.prevent="goTo(banner)" class="absolute left-6 bottom-4 lg:bottom-6 text-sm lg:text-lg px-2 lg:px-4 py-1 lg:py-2 text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Shop Now</button>
            </BackgroundImage>
          </div>

        </div>
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

        
        <div v-if="weeklyDealsLength > 0" class="h-auto py-4 flex flex-col lg:flex-row justify-center items-center gap-5 mb-6 bg-rose-50 rounded-md">
          <div class="xl:flex-shrink-0">
            <img class="w-full h-auto" src="~/assets/img/left_products.png" alt="">
          </div>
          <div class="my-2 xl:flex-shrink-0 flex flex-col justify-center items-center gap-4">
            <div class="font-semibold text-xl md:text-3xl">Deals of the Week</div>
            <CountDownTimer v-if="countDownDate !== null" 
              :countDownDate="countDownDate"
              dealType="weekly" 
            />
            <button @click.prevent="goToDeal()" type="button" class="bg-green-500 text-white hover:bg-green-600 hover:text-white rounded-full w-3/4  md:w-44 md:h-14 text-center font-semibold py-4">Shop Now</button>
          </div>
          <div class="xl:flex-shrink-0">
            <img class="w-full h-auto" src="~/assets/img/products_delivery.png" alt="">
          </div>          
        </div>

      </div>     
      <Deal />      
  </div>
</template>

<script>
'use strict';
import {mapActions, mapState, mapGetters} from "vuex";
import { firebaseApp } from "~/plugins/firebase.js"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";

export default {
  name: 'IndexPage',
  data() {
    return {
      imageUrl: '',
      imageUrl1: '',
      img: require('~/assets/img/logo.png'),
      token: ''
    }
  },
  async mounted() {
    this.imageUrl="https://api.bdshop.test/storage/images/categories/large/169272149864e4e15a25134.png";
    this.imageUrl1="https://api.bdshop.test/storage/images/categories/large/169272149864e4e15a25134.png";
    await this.getDailyDeals();
    await this.getWeeklyDeals();
    await this.getBanners();
    this.setCountDownDate('weekly');
    const messaging = getMessaging(firebaseApp);
    
    onMessage(messaging, (payload) => {
        //  console.log('Message on client:', payload);
         
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            // console.log('Notification permission granted.');
            let title = payload.notification.title;
            let body = payload.notification.body;
            
            new Notification(title, {
              body: body,
              icon: this.img,              
            });
          } else {
            // console.log('Unable to get permission to notify.');
          }
        });

    });
       
    const token = await getToken(messaging, {
              vapidKey: 'BEUUqHbYw5eVxU68gLtaQ9aBU52nBdlFRSnrFD-e7_s4izozsIWj6NNgpUVg_GXzCy76JP-8Tciw_HkmwWl3Qew',
    });

    if (token) {
      // console.log(token);
      this.token = token;
      this.sendTokenToServer(token);
    } else {
      // console.log('No registration token available. Request permission to generate one.');
    }
    
  }, 
  computed: {
    ...mapState('deals', ['dailyDeals', 'weeklyDeals', 'countDownDate']),    
    ...mapState('banners', ['banners']),
    ...mapGetters('deals', [      
      'weeklyDealsLength'
    ]),
  },
  methods: {
    ...mapActions('deals', ['getDailyDeals', 'getWeeklyDeals', 'setCountDownDate', 'setDealType']),    
    ...mapActions('banners', ['getBanners']),    
    goToDeal() {
      this.setDealType('weekly');
      this.$router.push('/deals')
    },
    async sendTokenToServer(currentToken) {      
      if (!this.isTokenSentToServer()) {
        // console.log('Sending token to server...');
         await this.$axios.$post('/devices', { token: currentToken })
         .then(response => {
            // console.log('device', response.data);
            this.setTokenSentToServer(true);
          })
          .catch(error => {
              console.log(error);
          });      
                  
      } else {
        // console.log('Token already sent to server so won\'t send it again ' +
        //     'unless it changes');
      }
    },

    isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') === '1';
    },

    setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? '1' : '0');
    },
    url(name) {
      let path = `/storage/images/banners/large/${name}`;
          return `${this.$config.baseURL}${path}`;
    },
    goTo(banner) {
      this.$router.push(`${banner.url}`)
    }

  },
}  
</script>
