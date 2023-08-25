<template>
    <section class="container">
      <div class="pb-2 flex flex-col justify-center items-center my-2 rounded-lg">
          <!-- deal header -->
          <div class="w-full px-8 py-8 h-min-72 bg-gradient-to-r from-sky-200 to-green-100 rounded">
              <!-- title -->
              <div class="mb-2 font-semibold text-2xl text-cyan-700 capitalize">
                Offers                 
              </div>
              <!-- header body -->
              <div class="flex flex-col">
                <!-- <div class=" font-bold text-xl text-blue-800 uppercase">
                    {{ offer.name }}
                </div> -->
                <!-- offer products -->
                <div class="flex gap-4 overflow-y-scroll">
                  
                  <div class="flex justify-center"
                  >
                      <div 
                      v-for="product in offer.products" :key="product.id"
                      class="relative p-2 rounded-lg w-48"
                      >
                        <ProductCard :product="product"/>
  
                        <div
                              v-if="offer.type === 'Percentage' || offer.type === 'Fixed Amount'" 
                              class="absolute flex right-0 bottom-0 p-3 gap-4"
                          >
                              
                              <div class="flex flex-col justify-center text-gray-100 text-center h-12 w-12 rounded-full bg-gradient-to-r from-red-700 to-orange-500 rotate-12">
                              <span class="text-xl">{{ offer.amount }}%</span>
                              <span class="-mt-1 text-xs">off</span>
                              </div>
                        </div>
                    
                        <div v-else class="absolute top-0">
                          <div class="pl-0 flex justify-end translate-x-28 translate-y-14 rotate-90">
                            <span 
                              class="pl-2 pr-2 text text-white"
                              :class="offer.type === 'Buy 1 Get 1' ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gradient-to-r from-orange-700 to-orange-500'"
                              >
                                {{offer.type}} 
                                <span class="uppercase">free</span>
                            </span>
                          </div>
                        </div> 
                      </div>
                  </div>
                </div>              
                <!-- <OfferProducts :offers="offer.products" /> -->
              </div>
          </div>
      </div>   
      <loader :action="action" :active="loader" />
    </section>
  </template>
  
  <script>
  import { mapState, mapGetters, mapActions } from "vuex";
  export default {
      // layout: 'dashboard',
      data() {
          return {
            action: '',
            loader: false,
            page: 0,
        }
      },
      async mounted() {                  
        await this.getOfferProducts(this.$route.params.offer)
      },
        computed: {          
          ...mapGetters('offers', [
            'activeOffersLength',
          ]),        
      },
      computed: {
        ...mapState('offers', ['offer']),
      },
      methods: {   
        ...mapActions('offers', ['getOfferProducts']),       
        url(image) {        
        //    let name = image.name;
          if (typeof image === 'object' && image !== null) {
            let path = `/storage/images/products/small/${image.name}`;
            return `${this.$config.baseURL}${path}`;
          }
        return; 
        },
      }
  
  }
  </script>
  
  <style>
  
  </style>