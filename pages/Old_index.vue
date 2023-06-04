<template>
  <!-- <div> -->
    <div class="p-8">
      <vue-slick-carousel class="hero-slide" :arrows="false" :dots="true">
        <div class="slide-bg rounded-2xl pt-8">
          <div class="container">
            <div class="flex items-center">
              <div class="w-1/2 mr-6 font-size-22">
                <p class="bs-dark-green-color font-size-32 mb-4">Save up 30% off</p>
                <h2 class="text-7xl font-bold mb-6 text-gray-800">Bengal Vegetable farm  Organic 100%</h2>
                <p class="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula faucibus massa est elit maecenas.</p>

                <nuxt-link to="/" class="bs-button text-base">Shop Now</nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img width="550" src="~/assets/img/hero.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="slide-bg rounded-2xl pt-8">
          <div class="container">
            <div class="flex items-center">
              <div class="w-1/2 mr-6 font-size-22">
                <p class="bs-dark-green-color font-size-32 mb-4">Save up 40% off</p>
                <h2 class="text-7xl font-bold mb-6 text-gray-800">Bengal Vegetable farm  Organic 100%</h2>
                <p class="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula faucibus massa est elit maecenas.</p>

                <nuxt-link to="/" class="bs-button text-base">Shop Now</nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img width="550" src="~/assets/img/hero.png" alt="">
              </div>
            </div>
          </div>
        </div>

        <div class="slide-bg rounded-2xl pt-8">
          <div class="container">
            <div class="flex items-center">
              <div class="w-1/2 mr-6 font-size-22">
                <p class="bs-dark-green-color font-size-32 mb-4">Save up 50% off</p>
                <h2 class="text-7xl font-bold mb-6 text-gray-800">Bengal Vegetable farm  Organic 100%</h2>
                <p class="mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula faucibus massa est elit maecenas.</p>

                <nuxt-link to="/" class="bs-button text-base">Shop Now</nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img width="550" src="~/assets/img/hero.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </vue-slick-carousel>

      <div class="container pt-20">
        <h3 class="text-4xl mb-6">Search by Category</h3>
        <div class="flex items-center mb-10">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>

        <CarouselCategories />

        <div class="flex -mx-6 mb-14">
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
        </div>

        <h3 class="text-4xl mb-6">Deals of the Week</h3>
        <div class="flex items-center mb-10">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>
        
        <div v-if="dailyDeals.length > 0">
          <CarouselDeals :deals="dailyDeals" />
        </div>

        <h3 class="text-4xl mb-6">Popular Branweeks</h3>
        <div class="flex items-center mb-10">
          <div style="height: 3px" class="w-32 bs-dark-green-bg"></div>
          <div style="height: 2px" class="w-full bg-gray-200"></div>
        </div>
    
        <CarouselProductBrands />
        
        <div class="flex -mx-6 mb-12">
          <div class="w-1/3 px-6">
            <div class="cta-1 flex p-6 rounded-xl">
              <div class="w/1-2">
                <h3 class="font-size-32 leading-tight font-semibold mb-10">Fresh Fruits Collection</h3>
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
                <h3 class="font-size-32 leading-tight font-semibold mb-10">Vegetable Collection</h3>
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
                <h3 class="font-size-32 leading-tight font-semibold mb-10">Grocery Items</h3>
                <nuxt-link to="/" class="h-12 w-12 flex justify-center items-center rounded-full bg-white inline-block"><img src="~/assets/img/arrow-right.png" alt=""></nuxt-link>
              </div>
              <div class="w-1/2 flex justify-end">
                <img class="h-40" src="~/assets/img/grocery-items.png" alt="">
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  <!-- </div> -->
</template>

<script>
'use strict';
// import dealsOfTheWeekProducts from 'assets/deals-of-the-weeks-products.json';
import {mapActions, mapState} from "vuex";
// import { initializeApp } from 'firebase-admin/app';
// import { initializeApp, applicationDefault } from 'firebase-admin/app';
// const { initializeApp, applicationDefault } = require('firebase-admin/app');
// import { initializeApp} from "firebase/app";
// import { getAuth } from "firebase/auth";
import { firebaseApp } from "~/plugins/firebase.js"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
// import { messaging } from '@/plugins/firebase';

export default {
  name: 'IndexPage',
  data() {
    return {
      // dealsOfTheWeekProducts: [],
      img: require('~/assets/img/logo.png')
    }
  },
  async mounted() {
    await this.getDailyDeals();
    
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
    console.log(token);
    
  },
  methods: {
    ...mapActions('deals', ['getDailyDeals']),
  },
  computed: {
    ...mapState('deals', ['dailyDeals']),    
  }
}  
</script>
